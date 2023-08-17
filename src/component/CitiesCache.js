const CITIES_CACHE = 'CITIES_CACHE';
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;

const currentTime = () => {
  return Date.now();
};

export const getCityData = () => {
  let cityData = localStorage.getItem(CITIES_CACHE);

  if (cityData) {
    cityData = JSON.parse(cityData);

    if (currentTime() - cityData.timestamp < TWO_WEEKS) {
      return cityData.data;
    }
  }

  return null;
};

export const setCityData = (data) => {
  localStorage.setItem(
    CITIES_CACHE,
    JSON.stringify({
      timestamp: currentTime(),
      data,
    }),
  );
};
