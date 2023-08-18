import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Home from '../src/pages/Home';
import WeatherDetails from '../src/pages/WeatherDetails';
import WeatherApiPage from '../src/pages/WeatherApiPage';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/weather-details" element={<WeatherDetails />} />
        <Route index path="/" element={<WeatherApiPage />} />
      </Routes>
    </>
  );
}

export default App;
