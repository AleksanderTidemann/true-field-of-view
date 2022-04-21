import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api/api-actions";
import { createSelector } from "reselect";
// import moment from "moment";

//forecastData is receveid from express server

const slice = createSlice({
  name: "forecast",
  initialState: {
    lastFetch: 0,
    isLoading: false,
    isError: false,
    data: {},
  },
  reducers: {
    forecastDataRequested: (forecast, action) => {
      forecast.isLoading = true;
      forecast.isError = false;
    },
    forecastDataReceived: (forecast, action) => {
      forecast.data = action.payload;
      forecast.isLoading = false;
      forecast.isError = false;
      forecast.lastFetch = Date.now();
    },
    forecastDataRequestFalied: (forecast, action) => {
      forecast.isLoading = false;
      forecast.isError = true;
    },
  },
});

const {
  forecastDataRequested,
  forecastDataRequestFalied,
  forecastDataReceived,
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "/forecast/data";
export const loadForecast = (userCoords) => (dispatch, getState) => {
  //less than 10 minutes. caching..
  //const { lastFetch } = getState().crowds;
  // const timerInMinutes = 10;

  //const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  //if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      data: userCoords,
      method: "post",
      onStart: forecastDataRequested.type,
      onSuccess: forecastDataReceived.type,
      onError: forecastDataRequestFalied.type,
    })
  );
};

// Selectors
const getForecast = (state) => state.forecast;

export const getLoading = createSelector(
  getForecast,
  (forecast) => forecast.isLoading
);

export const getError = createSelector(
  getForecast,
  (forecast) => forecast.isError
);

export const getForecastData = createSelector(
  getForecast,
  (forecast) => forecast.data
);
