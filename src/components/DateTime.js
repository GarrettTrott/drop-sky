import React from 'react'
import { useState, useEffect } from 'react'

export const DateTime = (props) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000)
    return function cleanup() {
      clearInterval(timerID)
    }
  })

  const tick = () => {
    setDate(new Date())
  }

  return (
    <div className="dateTime">
      {date.toLocaleDateString()}{' '}
      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  )
}

export default DateTime
