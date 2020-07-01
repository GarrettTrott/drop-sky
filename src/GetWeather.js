let latitude = '45.21971'
let longitude = '-122.585952'
let uppersAirport = 'PDX'

const fetchData = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .catch((error) =>
      console.log('Looks like there was in issue with your request...', error)
    )
}

const checkStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const getOpenWeather = (lat, lon) => {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  return fetchData(apiURL)
}

const getUppers = (airportCode) => {
  const winds = require('@faa-aviation-data-portal/winds-aloft')

  winds
    .FD1({
      location: 'US1',
      issuanceTimeFrom: new Date('2019-09-06T13:36:00+00:00'),
    })
    .then((result) => {
      console.log(result[0].parsedProductText.data)
    })
    .catch((error) =>
      console.log('Looks like there was in issue with your request...', error)
    )
}

module.exports = {
  latitude,
  longitude,
  uppersAirport,
  getOpenWeather,
  getUppers,
}
