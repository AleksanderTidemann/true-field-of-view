import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as calc from "../../utils/calc";

// should also get this on the server
// load Canvas Data
const CANVAS_SCHEMA = {
  isEyepieceMode: true,
  hasGrid: true,
  hasLabels: true,
  hasRedGrid: false,
  redGridFactor: 6,
  zoomValue: 50,
  zoomIncrement: 10,
  plotSizeX: 20,
  plotSizeY: 20,
  angularUnit: calc.ANGULAR_MEASUREMENT_LABELS[1],
};

const slice = createSlice({
  name: "canvas",
  initialState: {
    // this is the default schema that is set when the user switches mode.
    // It should be received from the server on load
    defaultData: CANVAS_SCHEMA,
    // userData are the changes the user makes to the defaultData and sees in the chart.
    userData: CANVAS_SCHEMA,
  },
  reducers: {
    canvasDataReset: canvas => {
      canvas.userData = canvas.defaultData;
    },
    modeSwitched: (canvas, action) => {
      canvas.userData.isEyepieceMode = action.payload;
      canvas.defaultData.isEyepieceMode = action.payload;
    },
    gridSwitched: (canvas, action) => {
      const grid = action.payload;
      canvas.userData.hasGrid = grid;
      canvas.userData.hasRedGrid = !grid ? false : canvas.userData.hasRedGrid;
    },
    labelSwitched: (canvas, action) => {
      canvas.userData.hasLabels = action.payload;
    },
    redGridSwitched: (canvas, action) => {
      canvas.userData.hasRedGrid = action.payload;
    },
    zoomedInn: canvas => {
      const { zoomValue, zoomIncrement } = canvas;
      const newZoomValue =
        zoomValue + zoomIncrement > 100 ? 100 : zoomValue + zoomIncrement;
      canvas.userData.zoomValue = newZoomValue;
    },
    zoomedOut: canvas => {
      const { zoomValue, zoomIncrement } = canvas;
      const newZoomValue =
        zoomValue - zoomIncrement <= 10 ? 10 : zoomValue - zoomIncrement;
      canvas.userData.zoomValue = newZoomValue;
    },
    canvasSizeUpdated: (canvas, action) => {
      //payload is formData
      const { eyepieceafov, eyepiecefocallength, focallength, barlow } =
        action.payload;
      const { pixelsize, resolutionx, resolutiony } = action.payload;
      let newCanvasSize = [];

      if (canvas.userData.isEyepieceMode) {
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

      canvas.userData.plotSizeX = newCanvasSize.plotSizeX;
      canvas.userData.plotSizeY = newCanvasSize.plotSizeY;
      canvas.userData.angularUnit = newCanvasSize.angularUnit;
    },
  },
});

const {
  canvasSizeUpdated,
  zoomedOut,
  zoomedInn,
  redGridSwitched,
  labelSwitched,
  modeSwitched,
  gridSwitched,
  canvasDataReset,
} = slice.actions;
export default slice.reducer;

// Action Creators
//export const loadCanvasData = () => (dispatch, getState) => {};
//from api
export const switchMode = bool => modeSwitched(bool);
export const switchGrid = bool => gridSwitched(bool);
export const switchLabel = bool => labelSwitched(bool);
export const switchRedGrid = bool => redGridSwitched(bool);
export const zoomInn = () => zoomedInn();
export const zoomOut = () => zoomedOut();
export const updateCanvasSize = formData => canvasSizeUpdated(formData);
export const resetCanvasData = () => canvasDataReset();

// Selectors
export const getUserData = state => state.canvas.userData;

export const getMode = createSelector(
  getUserData,
  userData => userData.isEyepieceMode
);

export const getHasGrid = createSelector(
  getUserData,
  userData => userData.hasGrid
);

export const getHasRedGrid = createSelector(
  getUserData,
  userData => userData.hasRedGrid
);

export const getHasLabels = createSelector(
  getUserData,
  userData => userData.hasLabels
);

export const getZoomValue = createSelector(
  getUserData,
  userData => userData.zoomValue
);
