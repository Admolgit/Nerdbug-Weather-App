import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Style from '../style/weather.module.css';
import Note from '../component/Note';
import { getCustomApi, getLocation } from '../utils/api';
import { getWeatherData, setWeatherData } from '../component/WeatherCache';

function WeatherDetails({weather}) {
  console.log(weather, "WEATHER");
  const [weatherItems, setWeatherItems] = useState(null);
  const [city, setCity] = useState(`lagos`);

  const getWeather = async () => {
    const jsonWeather = await getCustomApi(city);

    setWeatherData(jsonWeather);

    setWeatherItems(jsonWeather);
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const weatherFromLocalStorage =
      JSON.parse(localStorage.getItem('weather')) || [];

    const city = e.target.elements.city.value;

    if (!city) {
      alert('Please enter a city');
      return;
    }

    const weatherDataFound = weatherFromLocalStorage.find((item) => {
      return item.location.name === city;
    });

    if (weatherDataFound) {
      // replace data in local storage with new data
      const index = weatherFromLocalStorage.findIndex((item) => {
        return item.location.name === city;
      });
      weatherFromLocalStorage.splice(index, 1, weatherDataFound);
    }

    if (weatherDataFound === undefined) {
      setCity(city);
      weatherFromLocalStorage.push(weatherItems);
      localStorage.setItem('weather', JSON.stringify(weatherFromLocalStorage));
    }
  };

  // Adding city to favourites
  const addToFavourites = (e) => {
    const citiesFromLocalStorage = getWeatherData();
    const city =
      e.target.parentElement.firstChild.nextElementSibling.innerText.split(
        ' ',
      )[0];

    const cityData = Object.entries(citiesFromLocalStorage).find((e) => [
      +e[0] === city,
    ]);

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    const isCityInFavourites = favourites.find((item) => {
      return item?.cityData?.city === cityData[1].query.split(',')[0];
    });

    if (isCityInFavourites) {
      alert('City already in favourites');
      return;
    }

    if (!isCityInFavourites) {
      favourites.push({
        id: uuid(),
        cityData: {
          city: cityData[1].query.split(',')[0],
          country: cityData[1].query.split(',')[1].trim(),
        },
      });
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    // window.location.reload();
  };

  return (
    <div className={Style.weatherBoxContainer}>
      <div className={Style.weatherContainer1}>
        <div className={Style.weatherContainer}>
          <form onSubmit={handleSubmit} className={Style.weatherForm}>
            <input
              type="text"
              placeholder="Enter city"
              className={Style.weatherField}
              name="city"
            />
            <button type="Submit" className={Style.weatherButton}>
              Get Weather
            </button>
          </form>
        </div>
        <div className={Style.weather2}>
          <div>
            <h1 className={Style.weatherTitle}>Weather Details</h1>
            <p>Click on city </p>
          </div>

          <div className={Style.weatherDetails}>
            <div onClick={addToFavourites} className={Style.weatherBox}>
              <h1>City Name:</h1>
              <p>
                {weatherItems?.location?.name} {weatherItems?.location?.country}
              </p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Temperature:</h1>
              <p>{weatherItems?.current?.temperature}</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Humidity:</h1>
              <p>{weatherItems?.current?.humidity}</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Wind Speed:</h1>
              <p>{weatherItems?.current?.wind_speed}</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Local Time & Date:</h1>
              <p>{weatherItems?.location?.localtime}</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Pressure:</h1>
              <p>{weatherItems?.current?.pressure}</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>IsDay:</h1>
              <p>{weatherItems?.current?.is_day}</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Lat & Lng:</h1>
              <p>
                {weatherItems?.location?.lat} - {weatherItems?.location?.lon}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.weatherNote}>
        <Note />
      </div>
    </div>
  );
}

export default WeatherDetails;
