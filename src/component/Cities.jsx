import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Style from '../style/cities.module.css';
import { getCityData, setCityData } from './CitiesCache';

function Cities({ onCityClick }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_CITIES_URI}?limit=15&page=1&offset=0&sort=asc&order_by=city`,
      );
      const cachedCities = getCityData();

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

  const citiesFromLocalStorage = getCityData();

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
    const isCityInFavourites = favourites.find(
      (item) => item.city === cityData.city,
    );
    if (!isCityInFavourites) {
      favourites.push(cityData);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  console.log(cities);

  return (
    <div className={Style.citiesContainer}>
      <h1>Available Cities</h1>
      <ol className={Style.listItems}>
        {sortedCities.map((city) => (
          <div key={city.id}>
            <div>
              <li>
                <h2 onClick={onCityClick}>{city.city}</h2>
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
  );
}

export default Cities;
