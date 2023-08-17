import React from 'react';
import Style from '../style/weather.module.css';
import Note from '../component/Note';

function WeatherDetails({weather}) {
  console.log(weather, 'weatherDetails');
  return (
    <div className={Style.weatherBoxContainer}>
      <div className={Style.weatherContainer1}>
        <div className={Style.weatherContainer}>
          <form className={Style.weatherForm}>
            <input
              type="text"
              placeholder="Enter city"
              className={Style.weatherField}
            />
            <button className={Style.weatherButton}>Get Weather</button>
          </form>
        </div>
        <div className={Style.weather2}>
          <h1 className={Style.weatherTitle}>Weather Details</h1>

          <div className={Style.weatherDetails}>
            <div className={Style.weatherBox}>
              <h1>City Name</h1>
              <p>London</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Temperature</h1>
              <p>20</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Humidity</h1>
              <p>20</p>
            </div>
            <div className={Style.weatherBox}>
              <h1>Wind Speed</h1>
              <p>20</p>
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
