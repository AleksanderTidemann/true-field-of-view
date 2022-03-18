import { createSlice } from "@reduxjs/toolkit";
import DEFAULT_CANVAS_DATA from "./data";

const slice = createSlice({
  name: "canvasData",
  initialState: DEFAULT_CANVAS_DATA,
  reducers: {
    modeSwitched: (canvasData, action) => {
      canvasData.isEyepieceMode = action.payload;
    },
    gridSwitched: (canvasData, action) => {
      const grid = action.payload;
      canvasData.hasGrid = grid;
      canvasData.hasRedGrid = !grid ? false : canvasData.hasRedGrid;
    },
    labelSwitched: (canvasData, action) => {
      canvasData.hasLabels = action.payload;
    },
    redGridSwitched: (canvasData, action) => {
      canvasData.hasRedGrid = action.payload;
    },
    zoomedInn: canvasData => {
      const { zoomValue, zoomIncrement } = canvasData;
      const newZoomValue =
        zoomValue + zoomIncrement > 100 ? 100 : zoomValue + zoomIncrement;
      canvasData.zoomValue = newZoomValue;
    },
    zoomedOut: canvasData => {
      const { zoomValue, zoomIncrement } = canvasData;
      const newZoomValue =
        zoomValue - zoomIncrement <= 10 ? 10 : zoomValue - zoomIncrement;
      canvasData.zoomValue = newZoomValue;
    },
    formDataConvertedToCanvasObject: (canvasData, action) => {},
  },
});

const {
  zoomedOut,
  zoomedInn,
  redGridSwitched,
  labelSwitched,
  modeSwitched,
  gridSwitched,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const switchMode = bool => modeSwitched(bool);
export const switchGrid = bool => gridSwitched(bool);
export const switchLabel = bool => labelSwitched(bool);
export const switchRedGrid = bool => redGridSwitched(bool);
export const zoomInn = () => zoomedInn();
export const zoomOut = () => zoomedOut();
