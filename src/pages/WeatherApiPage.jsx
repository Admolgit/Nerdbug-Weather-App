import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cities from '../component/Cities';
import Style from '../style/home.module.css';
import WeatherDetails from './WeatherDetails';
import { setWeatherData } from '../component/WeatherCache';

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
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&query=${city}&units=m`);
        const {data} = response;

        console.log(data, "DATA5");

        setWeather(data);
        setWeatherData(data);
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
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Oops! Something went wrong...</div>;

  return (
    <div className={Style.homeContainer}>
    <Cities onCityClick={(id) => handleCityClick(id)} />
    </div>
  )
}

export default WeatherApiPage;