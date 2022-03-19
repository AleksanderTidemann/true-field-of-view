import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import DEFAULT_CANVAS_DATA from "./defaultCanvasData";
import * as calc from "../../utils/calc";

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
    canvasSizeCalculated: (canvasData, action) => {
      //payload is formData
      const { eyepieceafov, eyepiecefocallength, focallength, barlow } =
        action.payload;
      const { pixelsize, resolutionx, resolutiony } = action.payload;
      let newCanvasSize = [];

      if (canvasData.isEyepieceMode) {
        let eyeAFOV = calc.numberify(eyepieceafov.value);
        let eyeFL = calc.numberify(eyepiecefocallength.value);
        let fl = calc.numberify(focallength.value);
        let b = calc.numberify(barlow.value);

        newCanvasSize = calc.eye2canvas(eyeAFOV, eyeFL, fl, b);
      } else {
        let pxS = calc.numberify(pixelsize.value);
        let resX = calc.numberify(resolutionx.value);
        let resY = calc.numberify(resolutiony.value);
        let fl = calc.numberify(focallength.value);
        let b = calc.numberify(barlow.value);

        newCanvasSize = calc.cam2canvas(pxS, resX, resY, fl, b);
      }

      canvasData.plotSizeX = newCanvasSize.plotSizeX;
      canvasData.plotSizeY = newCanvasSize.plotSizeY;
      canvasData.angularUnit = newCanvasSize.angularUnit;
    },
  },
});

const {
  canvasSizeCalculated,
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
export const calculcateCanvasSize = formData => canvasSizeCalculated(formData);

// Selectors
export const getCanvasData = state => state.canvasData;

export const getMode = createSelector(
  getCanvasData,
  canvasData => canvasData.isEyepieceMode
);

export const getHasGrid = createSelector(
  getCanvasData,
  canvasData => canvasData.hasGrid
);

export const getHasRedGrid = createSelector(
  getCanvasData,
  canvasData => canvasData.hasRedGrid
);

export const getHasLabels = createSelector(
  getCanvasData,
  canvasData => canvasData.hasLabels
);

export const getZoomValue = createSelector(
  getCanvasData,
  canvasData => canvasData.zoomValue
);
