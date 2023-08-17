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
  localStorage.setItem(
    WEATHER_CACHE,
    JSON.stringify({
      timestamp: currentTime(),
      data,
    }),
  );
};
