import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api/api-actions";
import { createSelector } from "reselect";
// import moment from "moment";

//crowdData is receveic from express server

const slice = createSlice({
  name: "crowds",
  initialState: {
    lastFetch: 0,
    isLoading: true, // HMMMM
    isError: false,
    crowdData: [],
    currCrowd: {}, // solarsystem planets, moons, galaxies.. These kinds of crowds
    currBody: {}, // current planet, moon or galaxy.
  },
  reducers: {
    crowdDataRequested: (crowds) => {
      crowds.isLoading = true;
      crowds.isError = false;
    },
    crowdDataReceived: (crowds, action) => {
      crowds.crowdData = action.payload;
      crowds.currCrowd = action.payload[0]; // default crowd is the solarsystem planets
      crowds.isLoading = false;
      crowds.isError = false;
      crowds.lastFetch = Date.now();
    },
    crowdDataRequestFailed: (crowds) => {
      crowds.isLoading = false;
      crowds.isError = true;
    },
    currCrowdUpdated: (crowds, action) => {
      let newCrowd = crowds.crowdData.filter(
        (crowd) => crowd.key === action.payload
      );
      crowds.currCrowd = newCrowd[0];
      crowds.currBody = {};
    },
    currBodyUpdated: (crowds, action) => {
      let newBodyName = action.payload;
      let currBodyName = crowds.currBody.key;
      if (currBodyName !== newBodyName) {
        let newBody = crowds.currCrowd.data.filter(
          (body) => body.key === action.payload
        );
        crowds.currBody = newBody[0];
      } else {
        crowds.currBody = {};
      }
    },
    currBodyReset: (crowds) => {
      crowds.currBody = {};
    },
  },
});

const {
  currBodyUpdated,
  crowdDataRequested,
  crowdDataReceived,
  crowdDataRequestFailed,
  currCrowdUpdated,
  currBodyReset,
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "/crowds/data";
export const loadCrowdData = () => (dispatch, getState) => {
  //less than 10 minutes. caching..
  //const { lastFetch } = getState().crowds;
  // const timerInMinutes = 10;

  //const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  //if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      method: "get",
      onStart: crowdDataRequested.type,
      onSuccess: crowdDataReceived.type,
      onError: crowdDataRequestFailed.type,
    })
  );
};
export const loadCurrCrowd = (crowdName) => currCrowdUpdated(crowdName); //takes a string as argument
export const loadCurrBody = (bodyName) => currBodyUpdated(bodyName); //takes a string as argument
export const resetCurrBody = () => currBodyReset();

// Selectors
// loading and error for UI elements. returns booleans
const selectCrowds = (state) => state.crowds;
export const getLoading = createSelector(
  selectCrowds,
  (crowds) => crowds.isLoading
);
export const getError = createSelector(
  selectCrowds,
  (crowds) => crowds.isError
);

// crowd info
export const getCurrCrowd = createSelector(
  selectCrowds,
  (crowds) => crowds.currCrowd
); // returns an object with a key (string) and data(array) properties.

export const getCurrCrowdName = createSelector(
  selectCrowds,
  (crowds) => crowds.currCrowd.key
); // returns a string with the name of the currently selected crowd by the user

export const getAllCrowdNames = createSelector(selectCrowds, (crowds) =>
  crowds.crowdData.map((crowd) => crowd.key)
); // returns an array with strings of all the crowd names ["planets", "moons"]

// body info
export const getCurrBody = createSelector(
  selectCrowds,
  (crowds) => crowds.currBody
); // returns an object with properties such as key, magnitude, distancefromearth etc..

export const getCurrBodyName = createSelector(
  selectCrowds,
  (crowds) => crowds.currBody.key
); // returns a string with the name of the currently selected body by the user
