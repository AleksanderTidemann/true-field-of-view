import React, { useMemo, useState, useEffect, memo } from "react";
import BodySelector from "../BodySelector/BodySelector";
import CrowdSelector from "../CrowdSelector/CrowdSelector";
import { DIVIMAGES } from "../../data/img-data";
import DEFAULT_CROWD_DATA from "./utils/defaultCrowdData";
import { isEmptyObject } from "../../utils/calc";
import { getSolarSystemData } from "./utils/getSolarsystemdata";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { loadCrowdData } from "../../store/crowds/crowds";

const loading = DIVIMAGES.loading;
const error = DIVIMAGES.error;
const picWidth = "25px";

const Selector = ({ currBody, setCurrBody }) => {
  const dispatch = useDispatch();

  const [crowdData, setCrowdData] = useState({});
  const [currCrowd, setCurrCrowd] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch current space object API data on mount.
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchData = async () => {
      try {
        const newCrowdData = await getSolarSystemData(DEFAULT_CROWD_DATA);
        const firstCrowdName = Object.keys(newCrowdData)[0];
        const firstCrowd = newCrowdData[firstCrowdName];

        setCrowdData(newCrowdData);
        setCurrCrowd(firstCrowd);
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(loadCrowdData());
  }, []);

  // Set the current list of planets/space objects (currCrowd)
  const handleCrowdSelection = crowdSelection => {
    setCurrCrowd(crowdData[crowdSelection]);
    setCurrBody({});
  };

  // Set the current planet or space object selected (currBody)
  const handleBodySelection = bodyName => {
    setCurrBody(prevBody => {
      if (prevBody.key !== bodyName) {
        return { ...currCrowd[bodyName] };
      }
      return {};
    });
  };

  // array of strings
  const crowdNames = useMemo(
    () => (isEmptyObject(crowdData) ? [] : Object.keys(crowdData)),
    [crowdData]
  );

  if (isError) {
    return (
      <div className="container d-flex justify-content-around p-0 mb-4">
        <img src={error} alt="ERROR..." width={picWidth} height={picWidth} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-around p-0 mb-4">
        <img
          src={loading}
          alt="LOADING..."
          width={picWidth}
          height={picWidth}
        />
      </div>
    );
  }

  return (
    <div className="container p-0 mb-4">
      <div className="row">
        <CrowdSelector
          currCrowdName={isEmptyObject(currCrowd) ? "" : currCrowd.key}
          onCrowdSelection={handleCrowdSelection}
          crowdNames={crowdNames}
        />
        <BodySelector
          onBodySelection={handleBodySelection}
          currCrowd={currCrowd}
          currBodyName={isEmptyObject(currBody) ? "" : currBody.key}
        />
      </div>
    </div>
  );
};

Selector.propTypes = {
  setCurrBody: PropTypes.func.isRequired,
  currBody: PropTypes.object.isRequired,
};

// because globalCanvasData does not have to update the Selector
export default memo(Selector);
