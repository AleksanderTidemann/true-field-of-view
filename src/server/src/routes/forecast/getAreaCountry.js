import axios from "axios";
import config from "config";

export const getAreaCountry = async (lat, long) => {
  const response = await reverseGeocode(lat, long);
  const area = response.data.results[0].area;
  const country = response.data.results[0].country;
  return { area, country };
};

// Get the area and country of latitude and longitude coordinates via reverse geocoding
// from https://rapidapi.com/trueway/api/trueway-geocoding/
const reverseGeocode = (lat, long) => {
  const url = config.get("geocode.url");
  const options = {
    params: { location: lat + "," + long },
    headers: {
      "X-RapidAPI-Host": config.get("geocode.host"),
      "X-RapidAPI-Key": config.get("geocode.key"),
    },
  };
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(url, options);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
