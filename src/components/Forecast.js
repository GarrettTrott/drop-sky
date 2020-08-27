import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import TempBar from './TempBar'

// Icon Imports

const Forecast = ({ localWeather }) => {
  // Conditions State
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [sunset, setSunset] = useState(0)

  // Temperatures State
  const [currentTemp, setCurrentTemp] = useState(0)
  const [lowTemp, setLowTemp] = useState(0)
  const [highTemp, setHighTemp] = useState(0)
  const [hourlyTemps, setHourlyTemps] = useState([])

  // Cloud State
  const [cloudCover, setCloudCover] = useState([])

  // Precipitation State
  const [precipitation, setPrecipitation] = useState([])

  // Helper functions
  const convertTime = (unixTime) => {
    const time = new Date(unixTime * 1000).toLocaleString('en-US').slice(-10)
    return time
  }

  const capitalize = (string) => {
    let phrase = string.split(' ')
    for (let i = 0, x = phrase.length; i < x; i++) {
      phrase[i] = phrase[i][0].toUpperCase() + phrase[i].substr(1)
    }
    return phrase.join(' ')
  }

  // Populate state
  useEffect(() => {
    if (localWeather) {
      const hourlyTemps = []
      const cloudPercentage = []
      const precipitation = []

      // Set conditions
      setDescription(capitalize(localWeather.current.weather[0].description))
      setIcon(localWeather.current.weather[0].icon)
      setSunset(convertTime(localWeather.current.sunset))

      // Set Temps
      setCurrentTemp(Math.round(localWeather.current.temp))
      setLowTemp(Math.round(localWeather.daily[0].temp.min))
      setHighTemp(Math.round(localWeather.daily[0].temp.max))

      localWeather.hourly.forEach((hour) => {
        hourlyTemps.push(Math.round(hour.temp))
        cloudPercentage.push(hour.clouds)
        precipitation.push(hour.pop)
      })
      setHourlyTemps(hourlyTemps)
      setCloudCover(cloudPercentage)
      setPrecipitation(precipitation)
    }
  }, [localWeather])

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>{currentTemp}°</h1>
          <h4>{description}</h4>
          <TempBar hourlyTemps={hourlyTemps} />
          <h6>Sunset {sunset}</h6>
        </Col>
      </Row>
    </Container>
  )
}

Forecast.propTypes = {
  localWeather: PropTypes.object,
}

export default Forecast
