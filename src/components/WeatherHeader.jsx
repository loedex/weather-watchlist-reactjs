import React from 'react'

const WeatherHeader = () => {
  return (
    <div className='m-5'>
        <h1 className='font-extrabold text-4xl'>Weather Watchlist</h1>
        <p className='font-semibold'>Autorefreshes each city's data every 30 seconds</p>
    </div>
  )
}

export default WeatherHeader