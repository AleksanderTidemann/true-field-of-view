import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api/api-actions";
import { createSelector } from "reselect";
import * as calc from "../../utils/calc";
// import moment from "moment";

//canvasData is received from express server

const slice = createSlice({
  name: "canvas",
  initialState: {
    lastFetch: 0,
    isLoading: false,
    isError: false,
    // this is the default schema that is set when the user switches mode.
    // It should be received from the server on load
    defaultData: {},
    // userData are the changes the user makes to the defaultData and sees in the chart.
    userData: {},
  },
  reducers: {
    canvasDataRequested: canvas => {
      canvas.isLoading = true;
      canvas.isError = false;
    },
    canvasDataReceived: (canvas, action) => {
      const canvasDataSchema = action.payload;
      canvas.defaultData = canvasDataSchema;
      canvas.userData = canvasDataSchema;
      canvas.isLoading = false;
      canvas.isError = false;
    },
    canvasDataRequestFailed: canvas => {
      canvas.isLoading = false;
      canvas.isError = true;
    },
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
      const { zoomValue, zoomIncrement } = canvas.userData;
      const newZoomValue =
        zoomValue + zoomIncrement > 100 ? 100 : zoomValue + zoomIncrement;
      canvas.userData.zoomValue = newZoomValue;
    },
    zoomedOut: canvas => {
      const { zoomValue, zoomIncrement } = canvas.userData;
      const newZoomValue =
        zoomValue - zoomIncrement <= 10 ? 10 : zoomValue - zoomIncrement;
      canvas.userData.zoomValue = newZoomValue;
    },
    eyeCanvasUpdated: (canvas, action) => {
      //payload is formData
      const { eyepieceafov, eyepiecefocallength, focallength, barlow } =
        action.payload;

      let eyeAFOV = calc.numberify(eyepieceafov.value);
      let eyeFL = calc.numberify(eyepiecefocallength.value);
      let fl = calc.numberify(focallength.value);
      let b = calc.numberify(barlow.value);

      let newCanvasSize = calc.eye2canvas(eyeAFOV, eyeFL, fl, b);

      canvas.userData.plotSizeX = newCanvasSize.plotSizeX;
      canvas.userData.plotSizeY = newCanvasSize.plotSizeY;
      canvas.userData.angularUnit = newCanvasSize.angularUnit;
    },
    camCanvasUpdated: (canvas, action) => {
      //payload is formData
      const { focallength, barlow, pixelsize, resolutionx, resolutiony } =
        action.payload;

      let pxS = calc.numberify(pixelsize.value);
      let resX = calc.numberify(resolutionx.value);
      let resY = calc.numberify(resolutiony.value);
      let fl = calc.numberify(focallength.value);
      let b = calc.numberify(barlow.value);

      let newCanvasSize = calc.cam2canvas(pxS, resX, resY, fl, b);

      canvas.userData.plotSizeX = newCanvasSize.plotSizeX;
      canvas.userData.plotSizeY = newCanvasSize.plotSizeY;
      canvas.userData.angularUnit = newCanvasSize.angularUnit;
    },
  },
});

const {
  canvasDataRequested,
  canvasDataReceived,
  canvasDataRequestFailed,
  eyeCanvasUpdated,
  camCanvasUpdated,
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
export const url = "/canvas/data";
export const loadCanvasData = () => (dispatch, getState) => {
  //less than 10 minutes. caching..
  //const { lastFetch } = getState().crowds;
  // const timerInMinutes = 10;

  //const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  //if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      method: "get",
      onStart: canvasDataRequested.type,
      onSuccess: canvasDataReceived.type,
      onError: canvasDataRequestFailed.type,
    })
  );
};
export const switchMode = bool => modeSwitched(bool);
export const switchGrid = bool => gridSwitched(bool);
export const switchLabel = bool => labelSwitched(bool);
export const switchRedGrid = bool => redGridSwitched(bool);
export const zoomInn = () => zoomedInn();
export const zoomOut = () => zoomedOut();
export const updateEyeCanvas = formData => eyeCanvasUpdated(formData);
export const updateCamCanvas = formData => camCanvasUpdated(formData);
export const resetCanvasData = () => canvasDataReset();

// Selectors
export const getCanvas = state => state.canvas;
export const getCanvasData = state => state.canvas.userData;
export const getLoading = createSelector(getCanvas, canvas => canvas.isLoading);
export const getError = createSelector(getCanvas, canvas => canvas.isError);

export const getMode = createSelector(
  getCanvasData,
  userData => userData.isEyepieceMode
);

export const getHasGrid = createSelector(
  getCanvasData,
  userData => userData.hasGrid
);

export const getHasRedGrid = createSelector(
  getCanvasData,
  userData => userData.hasRedGrid
);

export const getHasLabels = createSelector(
  getCanvasData,
  userData => userData.hasLabels
);

export const getZoomValue = createSelector(
  getCanvasData,
  userData => userData.zoomValue
);
