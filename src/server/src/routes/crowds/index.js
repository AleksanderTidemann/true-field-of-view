import express from "express";
import { planets, moons } from "./schema.js";

function getCrowdsRoute() {
  const router = express.Router();
  router.get("/", send);
  return router;
}

const send = (req, res) => {
  const data = {
    planets,
    moons,
  };
  res.json(data);
  // get the schema from the "database"
  // pass the planetdata to getSolarsystemPlanetData
  // pass the moon data to getSolarsystemMoonData
  // at the end, concat the two objects and send as response to be stored in the state.
};

export { getCrowdsRoute };
