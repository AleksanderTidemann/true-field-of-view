import express from "express";
import canvasSchema from "./canvasSchema.json";

export const getCanvasRoute = () => {
  const router = express.Router();
  router.get("/data", getData);
  return router;
};

const getData = async (req, res) => {
  res.json(canvasSchema);
};
