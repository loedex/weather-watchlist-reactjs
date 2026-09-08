import React, { useEffect } from "react";
import { useState } from "react";
const WeatherCard = ({ onRemove, cityobj }) => {

const [weatherData, setWeatherData] = useState();
const [error, setError] = useState(null);
const [isLoading, setIsLoading] =  useState(true);
 const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(()=>{
        const fetchWeather = async ()=>{
            // console.log('Fetching again for : ',cityobj.name);
            
            try{    
                setIsLoading(true);
                setError(null);
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityobj.lat}&longitude=${cityobj.lon}&current_weather=true`;
                const response = await fetch(url);
                if(!response.ok) throw new Error('Could not get weather')
                const data = await response.json();
                
                setWeatherData(data);
                
                
                
            }catch(err){
                setError(err.message);
            }finally{
                setIsLoading(false);
            }
        }
        fetchWeather();
    },[cityobj, refreshTrigger]);


    //it triggers refresh
   
    useEffect(()=>{
        const intervalId = setInterval(() => {
            setRefreshTrigger((prev)=> prev+1);
        }, 30000);
        return ()=> clearInterval(intervalId);
    },[]);

    

  return (
    <div>
      <div className="bg-gray-400 my-4 p-7">
        <h2 className="font-bold text-4xl">{cityobj.name}</h2>

        {error && <p>Error Occurred - {error}</p> }
        {isLoading && <p>loading ... </p> }

        {!isLoading && !error && weatherData && (
            <div>
                <p className="text-2xl">Temperature : {weatherData?.current_weather?.temperature}</p>
        <p className="text-2xl">Wind Speed : {weatherData?.current_weather?.windspeed}</p>
            </div>
        )}

        
        <button
          onClick={() => onRemove(cityobj.name)}
          className="bg-blue-900 text-white px-5 py-2 mt-2 cursor-pointer hover:bg-blue-950"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
