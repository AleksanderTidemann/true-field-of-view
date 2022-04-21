import express from "express";
import { getForecast, filterForecast } from "./getForecast";
import { getAreaCountry } from "./getAreaCountry";

export const getForecastRoute = () => {
  const router = express.Router();
  router.post("/data", getData);
  return router;
};

const getData = async (req, res) => {
  const { lat, long } = req.body;

  // Using RapidAPI for the reverse Geocoding:
  // https://rapidapi.com
  const { area, country } = await getAreaCountry(lat, long);

  // using the `https://api.met.no/weatherapi/" to get the forecast
  const response = await getForecast(lat, long);
  const data = response.data.properties.timeseries;

  const { forecast, forecastTime, forecastDate } = filterForecast(data);
  const symbol_code = forecast.data.next_6_hours.summary.symbol_code;
  const temperature = forecast.data.instant.details.air_temperature;

  const result = {
    area,
    country,
    next6h_symbol_code: symbol_code,
    next6h_temp: temperature,
    current_date: forecastDate,
    current_time: forecastTime,
  };

  res.json(result);
};
