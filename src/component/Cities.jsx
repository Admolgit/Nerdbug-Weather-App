import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Style from '../style/cities.module.css';
import { getWeatherData, setWeatherData } from '../component/WeatherCache';
import { getCityData, setCityData } from './CitiesCache';
import Favourite from './Favourite';
import { v4 as uuid } from 'uuid';

function Cities({ onCityClick }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.openaq.org/v1/cities?limit=15&page=1&offset=0&sort=asc&order_by=city`,
      );
      const cachedCities = getCityData() || [];

      if (cachedCities.length !== 0) {
        setCities(cachedCities);
      } else {
        setCityData(data.results);
        setCities(data.results);
      }

      setLoading(false);
    };

    getData();
  }, []);

  const citiesFromLocalStorage = getCityData() || [];

  const sortedCities = citiesFromLocalStorage.sort((a, b) => b.count - a.count);

  // Removing city from list of cities on click of button from local storage
  const handleRemoveCity = (city) => {
    const citiesFromLocalStorages = getCityData();
    const filteredCities = citiesFromLocalStorages.filter(
      (item) => item.city !== city,
    );
    setCityData(filteredCities);
    setCities(filteredCities);
  };

  // Adding city to favourites
  const addToFavourites = (e) => {
    const citiesFromLocalStorage = getCityData();
    const city = e.target.parentElement.firstChild.innerText;
    const cityData = citiesFromLocalStorage.find((item) => item.city === city);
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isCityInFavourites = favourites.find((item) => {
      return item.cityData.city === cityData.city;
    });

    if (isCityInFavourites) {
      alert('City already in favourites');
      return;
    }

    if (!isCityInFavourites) {
      favourites.push({ id: uuid(), cityData });
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    window.location.reload();
  };

  const handleCityChange = (e) => {
    const city = e.target.innerHTML;

    localStorage.setItem('city', JSON.stringify(city));
    setCities(city);
  };

  const handleSearchPage = () => {
    navigate('/weather-details');
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={Style.citiesContainer}>
      <div className={Style.cityDivide}>
        <Favourite />
      </div>
      <div className={Style.cityDivide1}>
        <div className={Style.header}>
          <h1>Available Cities</h1>
          <button onClick={handleSearchPage}>Search Weather</button>
        </div>
        <p>Click on country name to get add city to favorites</p>
        <ol className={Style.listItems}>
          {sortedCities.map((city) => (
            <div>
              <div key={city.id}>
                <li>
                  <h2 onClick={onCityClick} onChange={handleCityChange}>
                    {city.city}
                  </h2>
                  <p onClick={addToFavourites}>Country: {city.country}</p>
                  <p>Count: {city.count}</p>
                </li>
              </div>
              <div>
                <button onClick={() => handleRemoveCity(city.city)}>
                  remove
                </button>
              </div>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Cities;
