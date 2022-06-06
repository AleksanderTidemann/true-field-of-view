import express from "express";
import { getPlanetData } from "./getPlanetData.js";
import { getMoonData } from "./getMoonData.js";
import planetSchema from "./planetSchema.json";
import moonSchema from "./moonSchema.json";

export const getCrowdsRoute = () => {
  const router = express.Router();
  router.get("/", getCrowds);
  router.get("/:key", getCrowd);
  return router;
};

const getCrowds = async (req, res) => {
  const crowds = await getCrowdsFromDb();
  if (crowds[0] === 500) return res.status(500).send(crowds[1]);

  res.json(crowds);
};

const getCrowd = async (req, res) => {
  const crowds = await getCrowdsFromDb();
  if (crowds[0] === 500) return res.status(500).send(crowds[1]);

  // check if the requsted crowd exists
  const crowd = crowds.find(c => c.key === req.params.key);
  if (!crowd) return res.status(404).send("Requested crowd does not exist..");

  res.json(crowd);
};

// get all crowd data.
// is going to be different.
const getCrowdsFromDb = async (req, res) => {
  try {
    const planets = await getPlanetData(planetSchema);
    const moons = await getMoonData(moonSchema);
    return [planets, moons];
  } catch (error) {
    return [500, error.message];
  }
};
