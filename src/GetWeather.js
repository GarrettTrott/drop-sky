const getWeather = async (lat, lon, airport) => {
  let weather = {}

  const celsiusToFahrenheit = (temp) => {
    return Math.round((temp * 9) / 5 + 32)
  }

  const knotsToMph = (knots) => {
    return Math.round(knots * 1.15087)
  }

  const convertTime = (unixTime) => {
    const date = new Date(unixTime * 1000)
    const hours = date.getHours() - 12
    const minutes = '0' + date.getMinutes()
    const formattedTime = `${hours}:${minutes}`

    return formattedTime
  }

  // store API keys
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  const metersXml =
    'https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml'
  const winds = require('@faa-aviation-data-portal/winds-aloft')

  // get Local forecast from Open Weather
  const getLocal = await fetch(apiURL)
  const localData = await getLocal.json()
  const logLocal = await console.log(localData)
  // const getMeters = await fetch(metersXml)
  // const metersData = await getMeters.text()
  // const logMeters = await console.log(metersData)

  // get uppers forecast
  const uppersData = await winds
    .FD1({
      location: 'US1',
      issuanceTimeFrom: new Date('2019-09-06T13:36:00+00:00'),
    })
    .then((result) => {
      return result[0].parsedProductText.data[airport]
    })

  const logUpppers = await console.log(uppersData)

  // format local weather
  const aggregateWeather = await Object.assign(weather, {
    location: localData.name,
    description: localData.weather[0].description,
    clouds: {
      coverage: localData.clouds.all,
    },
    temp: {
      ground: Math.round(localData.main.temp),
      three: celsiusToFahrenheit(uppersData[3000].tempC),
      six: celsiusToFahrenheit(uppersData[6000].tempC),
      nine: celsiusToFahrenheit(uppersData[9000].tempC),
      twelve: celsiusToFahrenheit(uppersData[12000].tempC),
      eighteen: celsiusToFahrenheit(uppersData[18000].tempC),
    },
    wind: {
      ground: {
        speed: Math.round(localData.wind.speed),
        deg: localData.wind.deg,
      },
      three: {
        speed: knotsToMph(uppersData[3000].windSpeedKnots),
        deg: uppersData[3000].windDirectionDegrees,
      },
      six: {
        speed: knotsToMph(uppersData[6000].windSpeedKnots),
        deg: uppersData[6000].windDirectionDegrees,
      },
      nine: {
        speed: knotsToMph(uppersData[9000].windSpeedKnots),
        deg: uppersData[9000].windDirectionDegrees,
      },
      twelve: {
        speed: knotsToMph(uppersData[12000].windSpeedKnots),
        deg: uppersData[12000].windDirectionDegrees,
      },
      eighteen: {
        speed: knotsToMph(uppersData[18000].windSpeedKnots),
        deg: uppersData[18000].windDirectionDegrees,
      },
    },
    sunset: convertTime(localData.sys.sunset) + ' PM',
  })

  return weather
}

module.exports = { getWeather }
