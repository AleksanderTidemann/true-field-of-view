import express from "express";
import { planetSchema, earthMoonSchema } from "./schema.js";
import getPlanetData from "./getPlanetData.js";
import getEarthMoonData from "./getEarthMoonData.js";

function getCrowdsRoute() {
  const router = express.Router();
  router.get("/", getData);
  return router;
}

const getData = async (req, res) => {
  // get the data
  const planets = planetSchema;
  const earthMoon = earthMoonSchema;

  // get the data
  const freshPlanets = await getPlanetData(planets);
  const freshEarthMoon = await getEarthMoonData(earthMoon);

  // store them togehter
  const newData = [freshPlanets, freshEarthMoon];

  res.json(newData);
};

export { getCrowdsRoute };
