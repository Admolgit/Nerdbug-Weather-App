const WEATHER_CACHE = 'WEATHER_CACHE';
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;

const currentTime = () => {
  return Date.now();
};

export const getWeatherData = () => {
  let weatherData = localStorage.getItem(WEATHER_CACHE);

  if (weatherData) {
    weatherData = JSON.parse(weatherData);

    if (currentTime() - weatherData.timestamp < TWO_WEEKS) {
      return weatherData.data;
    }
  }

  return null;
};

export const setWeatherData = (data) => {
  const existingWeatherData = JSON.parse(localStorage.getItem('weather')) || [];

  const weatherFound = existingWeatherData.find((weatherData) => {
    return weatherData.location.name === data.location.name;
  });

  if (weatherFound) {
    const index = existingWeatherData.findIndex((weatherData) => {
      return weatherData.location.name === data.location.name;
    });
    existingWeatherData.splice(index, 1, weatherFound);
    localStorage.setItem('weather', JSON.stringify(existingWeatherData));
  } else {
    localStorage.setItem(
      WEATHER_CACHE,
      JSON.stringify({
        timestamp: currentTime(),
        data,
      }),
    );
  }
};
