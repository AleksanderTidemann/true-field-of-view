import axios from "axios";

// Get forecast from YR API.
export const getForecast = (lat, long) => {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=${lat}&lon=${long}`;
  const options = { headers: { "User-Agent": "Axios 0.21.1" } };
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(url, options);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// filter forecastData from the YR API
export const filterForecast = data => {
  const currTime = Date();
  const currHour = currTime.slice(16, 18);
  const earliestHour = "21";
  const latestHour = "03";
  let idx;

  // We are only interested in one weather forcast at night time.
  // IF its night already, we find the current hour and return it.
  if (currHour >= earliestHour || currHour <= latestHour) {
    idx = data.findIndex(item => {
      return item.time.slice(11, 13) === currHour;
    });
  } else {
    idx = data.findIndex(item => {
      return item.time.slice(11, 13) === earliestHour;
    });
  }
  const forecast = data[idx];
  const forecastTime = forecast.time.slice(11, 16);
  const forecastDay = forecast.time.slice(8, 10);
  const forecastMonth = forecast.time.slice(5, 7);
  const forecastDate = forecastDay + "/" + forecastMonth;

  return { forecast, forecastTime, forecastDate };
};
