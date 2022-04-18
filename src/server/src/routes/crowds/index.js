import express from "express";
import { getPlanetData } from "./getPlanetData.js";
import { getMoonData } from "./getMoonData.js";

import planetSchema from "./planetSchema.json";
import moonSchema from "./moonSchema.json";

export const getCrowdsRoute = () => {
  const router = express.Router();
  router.get("/data", getData);
  return router;
};

const getData = async (req, res) => {
  // get the data
  const freshPlanets = await getPlanetData(planetSchema);
  const freshMoons = await getMoonData(moonSchema);

  // store them togehter
  const newData = [freshPlanets, freshMoons];

  res.json(newData);
};
