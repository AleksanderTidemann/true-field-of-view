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
