import React, { useEffect, useState, useCallback } from "react";
import Canvas from "./canvas/canvas";
import Selector from "./selector/selector";
import initCrowdData from "../../data/crowd-data";
import { getSolarSystemData } from "../../utils/requests/getSolarsystemdata";
import PropTypes from "prop-types";

const Chart = ({ globalCanvasData }) => {
  const [crowdData, setCrowdData] = useState({});
  const [currCrowd, setCurrCrowd] = useState({});
  const [currBody, setCurrBody] = useState({});
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

  // reset currBody when modeswitching
  useEffect(() => {
    setCurrBody({});
  }, [globalCanvasData.isEyepieceMode]);

  // Set the current list of planets/space objects (currCrowd)
  const handleCrowdSelection = useCallback(
    (crowdSelection) => {
      setCurrCrowd(crowdData[crowdSelection]);
      setCurrBody({});
    },
    [crowdData]
  );

  // Set the current planet or space object selected (currBody)
  const handleBodySelection = useCallback(
    (bodyName) => {
      setCurrBody((prevBody) => {
        if (prevBody.key !== bodyName) {
          return { ...currCrowd[bodyName] };
        }
        return {};
      });
    },
    [currCrowd]
  );

  return (
    <div className="container p-0">
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
      <Canvas globalCanvasData={globalCanvasData} currBody={currBody}></Canvas>
    </div>
  );
};

Chart.propTypes = {
  globalCanvasData: PropTypes.object.isRequired,
};

export default Chart;
