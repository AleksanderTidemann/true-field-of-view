import React, { useMemo, memo } from "react";
import BodySelector from "./bodyselector";
import CrowdSelector from "./crowdselector";
import { DIVIMAGES } from "../../../data/img-data";

const loading = DIVIMAGES.loading;
const error = DIVIMAGES.error;
const picWidth = "25px";

const Selector = ({
  isLoading,
  isError,
  isEyepieceMode,
  crowdData,
  currCrowd,
  currBody,
  onBodySelection,
  onCrowdSelection,
}) => {
  const crowdNames = useMemo(
    () => (crowdData ? Object.keys(crowdData) : []),
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
        <img src={loading} alt="LOADING..." width={picWidth} height={picWidth} />
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-around p-0 mb-4">
      <CrowdSelector
        isEyepieceMode={isEyepieceMode}
        currCrowdName={currCrowd.key}
        onCrowdSelection={onCrowdSelection}
        crowdNames={crowdNames}
      />
      <BodySelector
        onBodySelection={onBodySelection}
        currCrowd={currCrowd}
        currBodyName={currBody ? currBody.key : ""}
      />
    </div>
  );
};

// because globalCanvasData does not have to update the Selector
export default memo(Selector);
