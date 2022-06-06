import express from "express";
import { getCrowdsRoute } from "./crowds";
import { getCanvasRoute } from "./canvas";
import { getForecastRoute } from "./forecast";
import { getPresetsRoute } from "./presets";

function getRoutes() {
  // create a router for all the routes of our app
  const router = express.Router();
  router.use("/crowds", getCrowdsRoute());
  router.use("/canvasdata", getCanvasRoute());
  router.use("/forecast", getForecastRoute());
  router.use("/presets", getPresetsRoute());

  return router;
}

export { getRoutes };
