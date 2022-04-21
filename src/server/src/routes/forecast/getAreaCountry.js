import axios from "axios";
import rapid_api_key from "./rapid_api_key";

export const getAreaCountry = async (lat, long) => {
  const response = await reverseGeocode(lat, long);
  const area = response.data.results[0].area;
  const country = response.data.results[0].country;
  return { area, country };
};

// Get the area and country of latitude and longitude coordinates via reverse geocoding
// from https://rapidapi.com/trueway/api/trueway-geocoding/
const reverseGeocode = (lat, long) => {
  const url = "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode";
  const options = {
    params: { location: lat + "," + long },
    headers: {
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      "X-RapidAPI-Key": "a2818f755dmshd33cce0135e90fdp15e85ejsn20915d56e974",
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
