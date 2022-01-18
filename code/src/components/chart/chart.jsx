import React, { useEffect, useState } from "react";
import Canvas from "./canvas/canvas";
import BodySelector from "./selector/bodyselector";
import CrowdSelector from "./selector/crowdselector";
import initCrowdData from "../../data/crowd-data";
import { getSolarSystemData } from "../../utils/requests/getSolarsystemdata";
import PropTypes from "prop-types";

const Chart = ({ canvasData }) => {
  const [crowdData, setCrowdData] = useState(null);
  const [currCrowd, setCurrCrowd] = useState(null);
  const [currBody, setCurrBody] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch current API data on celestiasl objects (AU, distance from earth etc.)
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

  // Set the currCrowed based on the user selection in the crowdSelector menu.
  const handleCrowdSelection = (crowdSelection) => {
    if (!isLoading && !isError) {
      setCurrCrowd(crowdData[crowdSelection]);
      setCurrBody(null);
    }
  };

  const handleBodySelection = (bodyName) => {
    if (!isLoading && !isError) {
      if (!currBody || currBody.key !== bodyName) {
        setCurrBody(currCrowd[bodyName]);
        return;
      }
      setCurrBody(null);
    }
  };

  return (
    <div className="container p-0">
      <div className="container d-flex justify-content-around p-0 mb-4">
        <CrowdSelector
          isEyepieceMode={canvasData.isEyepieceMode}
          currCrowdName={currCrowd ? currCrowd.key : ""}
          onCrowdSelection={handleCrowdSelection}
          // get crowdNames should be a useMemo.
          // an array will not be memoized correctly.
          crowdNames={crowdData ? Object.keys(crowdData) : []}
        />
        <BodySelector
          isLoading={isLoading}
          isError={isError}
          onBodySelection={handleBodySelection}
          currCrowd={currCrowd ? currCrowd : {}}
          currBodyName={currBody ? currBody.key : ""}
        />
      </div>
      <Canvas
        canvasData={canvasData}
        currBody={currBody ? currBody : {}}
      ></Canvas>
    </div>
  );
};

Chart.propTypes = {
  canvasData: PropTypes.object.isRequired,
};

export default Chart;
