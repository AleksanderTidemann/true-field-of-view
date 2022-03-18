import { combineReducers } from "redux";
import canvasDataReducer from "./canvasData/canvasData";

export default combineReducers({
  canvasData: canvasDataReducer,
});
