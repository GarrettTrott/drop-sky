import React from 'react'
import PropTypes from 'prop-types'

const WindsAloft = {METERWeather, uppersWeather} => {

  const celsiusToFahrenheit = (temp) => {
    return Math.round((temp * 9) / 5 + 32)
  }

  const knotsToMph = (knots) => {
    return Math.round(knots * 1.15087)
  }

  return (
    <div>
      
    </div>
  )
}

WindsAloft.propTypes = {

}

export default WindsAloft
