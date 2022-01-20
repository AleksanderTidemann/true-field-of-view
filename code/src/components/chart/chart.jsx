import React, { useEffect, useState, useCallback } from "react";
import Canvas from "./canvas/canvas";
import Selector from "./selector/selector";
import initCrowdData from "../../data/crowd-data";
import { getSolarSystemData } from "../../utils/requests/getSolarsystemdata";
import PropTypes from "prop-types";

const Chart = ({ globalCanvasData }) => {
  const [crowdData, setCrowdData] = useState(null);
  const [currCrowd, setCurrCrowd] = useState(null);
  const [currBody, setCurrBody] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch current space object API data on mount.
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchData = async () => {
      try {
        const newCrowdData = await getSolarSystemData(initCrowdData);
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

  // Set the current list of planets/space objects (currCrowd)
  const handleCrowdSelection = useCallback(
    (crowdSelection) => {
      setCurrCrowd(crowdData[crowdSelection]);
      setCurrBody(null);
    },
    [crowdData]
  );

  // Set the current planet or space object selected (currBody)
  const handleBodySelection = useCallback(
    (bodyName) => {
      setCurrBody((prevBody) => {
        if (!prevBody || prevBody.key !== bodyName) {
          return { ...currCrowd[bodyName] };
        }
        return null;
      });
    },
    [currCrowd]
  );

  return (
    <>
      <Selector
        isLoading={isLoading}
        isError={isError}
        isEyepieceMode={globalCanvasData.isEyepieceMode}
        crowdData={crowdData}
        currCrowd={currCrowd}
        currBody={currBody}
        onBodySelection={handleBodySelection}
        onCrowdSelection={handleCrowdSelection}
      />
      <Canvas canvasData={globalCanvasData} currBody={currBody ? currBody : {}}></Canvas>
    </>
  );
};

Chart.propTypes = {
  globalCanvasData: PropTypes.object.isRequired,
};

export default Chart;
