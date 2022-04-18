import express from "express";
import { getCrowdsRoute } from "./crowds";
import { getCanvasRoute } from "./canvas";

function getRoutes() {
  // create a router for all the routes of our app
  const router = express.Router();
  router.use("/crowds", getCrowdsRoute());
  router.use("/canvas", getCanvasRoute());
  // any additional routes would go here

  return router;
}

export { getRoutes };
