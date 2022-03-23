import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "./api-actions";

// if apicall began
// unpack
// next with the action to log it on the console.
// axios api call
// dispatch success or failure

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart }); // typically set loading to true

    next(action);

    try {
      const response = await axios.request({
        //   baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });
      // General
      dispatch(apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      dispatch(apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
