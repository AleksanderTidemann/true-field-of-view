import express from "express";

export const getPresetsRoute = () => {
  const router = express.Router();
  router.get("/", getPresets);
  router.get("/:id", getPreset);
  router.post("/", addPreset);
  router.delete("/:id", deletePreset);
  return router;
};

const getPresets = async (req, res) => {};

const getPreset = async (req, res) => {
  // get indivdual preset
};

const addPreset = async (req, res) => {
  // req.body should be the preset
  // should also include which module it is.
  // this will generate an internal id
};

const deletePreset = async (req, res) => {};
