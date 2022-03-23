import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api/api-actions";
import moment from "moment";

const slice = createSlice({
  name: "crowds",
  initialState: {
    lastFetch: 0,
    isLoading: false,
    isError: false,
    crowdData: {},
    currCrowd: {},
    currBody: {},
  },
  reducers: {
    crowdDataRequested: crowds => {
      crowds.isLoading = true;
      crowds.isError = false;
    },
    crowdDataReceived: (crowds, action) => {
      crowds.crowdData = action.payload;
      crowds.isLoading = false;
      crowds.isError = false;
      crowds.lastFetch = Date.now();
    },
    crowdDataRequestfailed: crowds => {
      crowds.isLoading = false;
      crowds.isError = true;
    },
  },
});

const { crowdDataRequested, crowdDataReceived, crowdDataRequestfailed } =
  slice.actions;
export default slice.reducer;

// Action creators
const url = "/api/crowds";
export const loadCrowdData = () => (dispatch, getState) => {
  //less than 10 minutes. caching..
  //const { lastFetch } = getState().crowdData;
  //const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  //if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      method: "get",
      onStart: crowdDataRequested.type,
      onSuccess: crowdDataReceived.type,
      onError: crowdDataRequestfailed.type,
    })
  );
};

// Selectors
export const getCurrCrowdName = () => {};
export const getAllCrowdNames = () => {};
export const currBodyName = () => {};
