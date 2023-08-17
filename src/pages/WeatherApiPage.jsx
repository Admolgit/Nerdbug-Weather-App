import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cities from '../component/Cities';
import Style from '../style/home.module.css';
import WeatherDetails from './WeatherDetails';
import { getWeatherData, setWeatherData } from '../component/WeatherCache';
import uuid from 'react-uuid';

function WeatherApiPage() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&query=${city}&units=m`);
        const data = await response.json();

        setWeather(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);

  const handleCityClick = (e) => {
    setCity(e.target.innerHTML);
    navigate('/weather-details');
    <WeatherDetails weather={weather} />
    console.log(e.target.innerHTML, "CITY")
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Oops! Something went wrong...</div>;

  
  console.log(weather, "WEATHER")
  console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY, "API KEY")

  return (
    <div className={Style.homeContainer}>
    <Cities onCityClick={(id) => handleCityClick(id)} />
    </div>
  )
}

export default WeatherApiPage;