import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_APIKEY, WEATHER_API_URL } from './api';
import { useState, useEffect } from 'react';
import Forecast from './components/forecast/forecast';
import './App.css';

function App() {


  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    
    var searchData = {value: '41.01384 28.94966', label: 'İstanbul, TR'}
    handleOnSearchChange(searchData);
    console.log("SearchData1:",searchData);

  }, [])
  

  const handleOnSearchChange = (searchData) => 
  {
    const [lat,lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_APIKEY}&units=metric`);
    const forecastFeth = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_APIKEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFeth])
    .then(async (response) =>
    {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));
  }
  return (
    <div className="container ">

      <Search
        onSearchChange={handleOnSearchChange}
      />
      { currentWeather && <CurrentWeather data={currentWeather} />}
      { forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
