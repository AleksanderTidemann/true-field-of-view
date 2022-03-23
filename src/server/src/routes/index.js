import express from "express";
import { getCrowdsRoute } from "./crowds";

function getRoutes() {
  // create a router for all the routes of our app
  const router = express.Router();
  router.use("/crowds", getCrowdsRoute());
  // any additional routes would go here

  return router;
}

export { getRoutes };
