import express from "express";
import { getWeather } from "./getWeather";
import { getAreaCountry } from "./getAreaCountry";
import { filterForecast } from "./filterForecast";
import Joi from "joi";

export const getForecastRoute = () => {
  const router = express.Router();
  router.post("/", getForecastData);
  return router;
};

const getForecastData = async (req, res) => {
  // input validation
  const schema = Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    long: Joi.number().min(-180).max(180).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // get the data and check for errors
  const { lat, long } = req.body;
  const response = await getForecast(lat, long);
  if (response[0] === 500) return res.status(500).send(response[1]);

  // if success, do some filtering
  const { weather, area, country } = response[1];
  const weatherTimeseries = weather.data.properties.timeseries;
  const { forecast, forecastTime, forecastDate } =
    filterForecast(weatherTimeseries);
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

  // respond with forecast
  res.json(result);
};

const getForecast = async (lat, long) => {
  try {
    // Using RapidAPI for the reverse Geocoding:
    // https://rapidapi.com
    const { area, country } = await getAreaCountry(lat, long);
    // using the `https://api.met.no/weatherapi/" to get the forecast
    const weather = await getWeather(lat, long);
    return [200, { weather, area, country }];
  } catch (error) {
    return [500, error.message];
  }
};
