import { combineReducers } from "redux";
import canvasDataReducer from "./slices/canvasDataSlice";
import crowdReducer from "./slices/crowdsSlice";

export default combineReducers({
  canvas: canvasDataReducer,
  crowds: crowdReducer,
});
