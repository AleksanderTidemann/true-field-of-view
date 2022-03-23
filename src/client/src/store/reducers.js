import { combineReducers } from "redux";
import canvasDataReducer from "./canvasData/canvasData";
import crowdReducer from "./crowds/crowds";
// import formDataReducer from "./formDataSubmitted/formDataSubmitted";

export default combineReducers({
  canvasData: canvasDataReducer,
  crowds: crowdReducer,
  //   formDataSubmitted: formDataReducer,
});
