export function filterData(data) {
  // filter forecastData from the YR API
  const currTime = Date();
  let currTimeHour = currTime.slice(16, 18);
  let idx;

  // We are only interested in one weather forcast at night time.
  // IF its night already, we find the current hour and return it.
  if (currTimeHour >= "21" || currTimeHour <= "03") {
    idx = data.findIndex(item => {
      return item.time.slice(11, 13) === currTimeHour;
    });
  } else {
    idx = data.findIndex(item => {
      return item.time.slice(11, 13) === "21";
    });
  }
  const forecast = data[idx];
  const forecastTime = forecast.time.slice(11, 16);
  const forecastDay = forecast.time.slice(8, 10);
  const forecastMonth = forecast.time.slice(5, 7);
  const forecastDate = forecastDay + "/" + forecastMonth;

  return { forecast, forecastTime, forecastDate };
}

export async function getLatLong() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          resolve({
            lat: Math.round(latitude),
            long: Math.round(longitude),
          });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject("geolocation API not supported :(");
    }
  });
}

export async function getData(lat, long) {
  const url =
    "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?altitude=0&lat=" +
    lat +
    "&lon=" +
    long;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getAreaCountry(lat, long) {
  // reverse geocode
  // from https://rapidapi.com/trueway/api/trueway-geocoding/
  const url =
    "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=" +
    lat +
    "%2C" +
    long +
    "&language=en";
  const data = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
      "x-rapidapi-key": "0883bdba11mshf2fb738d45837dep1b1585jsn09795b9d5441",
    },
  };

  const response = await fetch(url, data);
  const responseJSON = await response.json();
  const area = responseJSON.results[0].area;
  const country = responseJSON.results[0].country;
  return { area, country };
}
