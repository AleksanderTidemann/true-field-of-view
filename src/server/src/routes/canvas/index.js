import express from "express";
import canvasSchema from "./canvasSchema.json";

export const getCanvasRoute = () => {
  const router = express.Router();
  router.get("/", getCanvasData);
  return router;
};

const getCanvasData = async (req, res) => {
  if (!canvasSchema) return res.status(500).send("no canvas data found..");
  res.json(canvasSchema);
};
