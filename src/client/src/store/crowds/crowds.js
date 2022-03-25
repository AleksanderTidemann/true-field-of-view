import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api/api-actions";
import { createSelector } from "reselect";
import moment from "moment";

//crowdData schema in server

const slice = createSlice({
  name: "crowds",
  initialState: {
    lastFetch: 0,
    isLoading: false,
    isError: false,
    crowdData: [],
    currCrowd: {}, // solarsystem planets, moons, galaxies.. These kinds of crowds
    currBody: {}, // current planet, moon or galaxy.
  },
  reducers: {
    crowdDataRequested: crowds => {
      crowds.isLoading = true;
      crowds.isError = false;
    },
    crowdDataReceived: (crowds, action) => {
      crowds.crowdData = action.payload;
      crowds.currCrowd = action.payload[0]; // start with the planets
      crowds.isLoading = false;
      crowds.isError = false;
      crowds.lastFetch = Date.now();
    },
    crowdDataRequestfailed: crowds => {
      crowds.isLoading = false;
      crowds.isError = true;
    },
    currCrowdUpdated: (crowds, action) => {
      let newCrowd = crowds.crowdData.filter(
        crowd => crowd.key === action.payload
      );
      crowds.currCrowd = newCrowd[0];
      crowds.currBody = {};
    },
    currBodyUpdated: (crowds, action) => {
      let newBodyName = action.payload;
      let currBodyName = crowds.currBody.key;
      if (currBodyName !== newBodyName) {
        let newBody = crowds.currCrowd.data.filter(
          body => body.key === action.payload
        );
        crowds.currBody = newBody[0];
      } else {
        crowds.currBody = {};
      }
    },
  },
});

const {
  currBodyUpdated,
  crowdDataRequested,
  crowdDataReceived,
  crowdDataRequestfailed,
  currCrowdUpdated,
} = slice.actions;
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
export const loadCurrCrowd = crowdName => currCrowdUpdated(crowdName);
export const loadCurrBody = bodyName => currBodyUpdated(bodyName);

// Selectors
const selectCrowds = state => state.crowds;
export const getLoading = createSelector(
  selectCrowds,
  crowds => crowds.isLoading
);
export const getError = createSelector(selectCrowds, crowds => crowds.isError);
export const getCurrCrowdName = createSelector(
  selectCrowds,
  crowds => crowds.currCrowd.key
);
export const getCurrBodyName = createSelector(
  selectCrowds,
  crowds => crowds.currBody.key
);
export const getAllCrowdNames = createSelector(selectCrowds, crowds =>
  crowds.crowdData.map(crowd => crowd.key)
);
