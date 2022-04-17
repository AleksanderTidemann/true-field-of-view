import { combineReducers } from "redux";
import canvasDataReducer from "./slices/canvasSlice";
import crowdReducer from "./slices/crowdsSlice";
import colorReducer from "./slices/colorSlice";

export default combineReducers({
  canvas: canvasDataReducer,
  crowds: crowdReducer,
  colors: colorReducer,
});
