import axios from 'axios';

export const getCustomApi = async (city) => {
  const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&query=${city}&units=m`);
  console.log(response, "RES");
  const { data } = response;
  return data;
}

export const getLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  var result = [];

  async function success(position) {
    await axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=ad9dabe1e3484d4f942224655232505&q=${position?.coords?.latitude},${position?.coords?.longitude}&days=1&api=yes`,
    )
    .then(async (res) => {
      result = [res.data.location.region]
    })
    console.log(result, 'success1')
    // return [result];
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  return [result];
}