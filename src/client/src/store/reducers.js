import { combineReducers } from "redux";
import canvasDataReducer from "./canvasData/canvasData";
import crowdDataReducer from "./crowdData/crowdData";
// import formDataReducer from "./formDataSubmitted/formDataSubmitted";

export default combineReducers({
  canvasData: canvasDataReducer,
  crowdData: crowdDataReducer,
  //   formDataSubmitted: formDataReducer,
});
