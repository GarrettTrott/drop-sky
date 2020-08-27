import React, { useState, useEffect } from 'react'

import axios from 'axios'
import winds from '@faa-aviation-data-portal/winds-aloft'

import { Header } from './components/Header'
import { Map } from './components/Map'
import { Row, Col, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Forecast from './components/Forecast'

const App = () => {
  const [dropzone, setDropzone] = useState('PNW Skydiving')
  const [latitude, setLatitude] = useState('45.22')
  const [longitude, setLongitude] = useState('-122.59')
  const [uppersAirport, setUppersAirport] = useState('PDX')
  const [METERAirport, setMETERAirport] = useState('kuao')
  const [METERWeather, setMETERWeather] = useState()
  const [localWeather, setLocalWether] = useState()
  const [uppersWeather, setUppersWeather] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchWeather = async () => {
      // API key references
      const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY
      const checkWXKey = process.env.REACT_APP_CHECK_WX_API_KEY

      const localResult = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${openWeatherKey}`
      )
      const METERResult = await axios(
        `https://api.checkwx.com/metar/${METERAirport}/decoded`,
        { headers: { 'X-API-Key': `${checkWXKey}` } }
      )

      const uppersResult = await winds
        .FD1({
          location: 'US1',
          issuanceTimeFrom: new Date('2019-09-06T13:36:00+00:00'),
        })
        .then((result) => {
          return setUppersWeather(
            result[0].parsedProductText.data[uppersAirport]
          )
        })
      setMETERWeather(METERResult.data)
      setLocalWether(localResult.data)
      setIsLoading(false)
    }

    fetchWeather()

    const interval = setInterval(() => {
      setIsLoading(true)
      fetchWeather()
    }, 86400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Header dropzone={dropzone} isLoading={isLoading} />
      <Container fluid>
        <Row>
          <Col className="forecast" sm={12} md={3}>
            <Forecast localWeather={localWeather} />
          </Col>
          <Col className="map" sm={12} md={6}>
            <Map />
          </Col>
          <Col className="windsAloft" sm={12} md={3}>
            3 of 3
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
