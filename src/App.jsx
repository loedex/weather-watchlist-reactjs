import React from 'react'
import WeatherSearch from './components/WeatherSearch'
import WeatherCard from './components/WeatherCard'
import WeatherHeader from './components/WeatherHeader'
import { useState } from 'react'

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  function handleRemove(cityName) {
    setWatchlist((prev)=> prev.filter((c)=> c.name !== cityName));
  }
  return (
    <div>
      <WeatherHeader />
      <WeatherSearch onSearch={setSearchText} searchText={searchText} watchlist={watchlist} onWatchlist={setWatchlist}/>
      

      {
        watchlist.map((cityObject)=> (
          
            <WeatherCard key={cityObject.name} cityobj = {cityObject} onRemove={handleRemove}/>
          
        ))
      }
    </div>
  )
}

export default App
