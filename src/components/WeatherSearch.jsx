import React from 'react'
import { useState } from 'react'
import { CITY_COORDINATES } from './WeatherCityInputData';
const WeatherSearch = ({searchText, onSearch, watchlist, onWatchlist}) => {

    
    const [error, setError] = useState(null);

    const handleSubmit = (e)=> {
        e.preventDefault();
        const key = searchText.trim().toLowerCase();
        if(!key){
            setError('PLease enter city name ..');
            return;
        }
        const match = CITY_COORDINATES[key];
        if(!match){
            setError('Kindly enter the city which is include in list.');
            return;
        }
        // console.log(match);

        const isDuplicate = watchlist.some(i => i.name === match.name)

        if(isDuplicate){
            setError('This city is already in your watchlist');
            return;
        }
        
        onWatchlist((prev)=> ([...prev , match]))
        // console.log(match);
        
        // console.log(watchlist);
        setError(null);
        onSearch('');
        
        
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}  className='flex gap-2 px-10'>
            <input
            type="text"
            placeholder='Enter city name ...'
            className='outline-0 border border-gray-700 rounded-full grow px-7 py-3' 
            value={searchText}
            onChange={(e)=> onSearch(e.target.value)}
            />
            <button
             type='submit'
             className='bg-blue-900 text-white hover:bg-blue-950 rounded-full px-3 cursor-pointer'
             >Add to watchlist</button>
        </form>
       {error && <p className='text-red-600 ml-15'>{error}</p>}
       {/* <p>{`current value of error :${error}`}</p> */}
    </div>
  )
}

export default WeatherSearch