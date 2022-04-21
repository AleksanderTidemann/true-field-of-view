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
    params: { location: lat + "," + long },
    headers: {
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
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
