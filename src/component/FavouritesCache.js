const FAVOURITES_CACHE = 'FAVOURITES_CACHE';
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;

const currentTime = () => {
  return Date.now();
};

export const getWeatherData = () => {
  let favoriteData = localStorage.getItem(FAVOURITES_CACHE);

  if (favoriteData) {
   favoriteData = JSON.parse(favoriteData);

    if (currentTime() -favoriteData.timestamp < TWO_WEEKS) {
      return favoriteData.data;
    }
  }

  return null;
};

export const setWeatherData = (data) => {
  localStorage.setItem(
    FAVOURITES_CACHE,
    JSON.stringify({
      timestamp: currentTime(),
      data,
    }),
  );
};
