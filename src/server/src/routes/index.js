import express from "express";
import { getCrowdsRoute } from "./crowds";
import { getCanvasRoute } from "./canvas";
import { getForecastRoute } from "./forecast";

function getRoutes() {
  // create a router for all the routes of our app
  const router = express.Router();
  router.use("/crowds", getCrowdsRoute());
  router.use("/canvas", getCanvasRoute());
  router.use("/forecast", getForecastRoute());

  return router;
}

export { getRoutes };
