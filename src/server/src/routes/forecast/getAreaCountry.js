import axios from "axios";

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
    params: { location: lat + "," + long, language: "en" },
    headers: {
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      "X-RapidAPI-Key": "c499ff4a51mshc72548c6cb479ebp1b010djsn61f89558a183",
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
