import axios from "axios";
import config from "config";

// Get forecast from `https://api.met.no/weatherapi/"
export const getWeather = (lat, long) => {
  const url = config.get("weatherapi.url") + `?lat=${lat}&lon=${long}`;
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
