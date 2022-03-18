import { createSlice } from "@reduxjs/toolkit";
import DEFAULT_CANVAS_DATA from "./data";

const slice = createSlice({
  name: "canvasData",
  initialState: DEFAULT_CANVAS_DATA,
  reducers: {
    modeSwitched: (canvasData, action) => {
      canvasData.isEyepieceMode = action.payload.isEyepieceMode;
    },
    // formDataConvertedToCanvasObject
    // gridChanged
    // LabelChanged
    // RedGridChanged
    // ZoomChanged
  },
});

const { modeSwitched } = slice.actions;
export default slice.reducer;

// Action Creators
export const switchMode = bool => ({
  type: modeSwitched.type,
  payload: {
    isEyepieceMode: bool,
  },
});
