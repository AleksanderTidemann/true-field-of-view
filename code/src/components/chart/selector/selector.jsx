import React, { useMemo, memo } from "react";
import BodySelector from "./bodyselector";
import CrowdSelector from "./crowdselector";
import { DIVIMAGES } from "../../../data/img-data";
import { isEmptyObject } from "../../../utils/calc";
import PropTypes from "prop-types";

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
        <img src={loading} alt="LOADING..." width={picWidth} height={picWidth} />
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-around p-0 mb-4">
      <CrowdSelector
        isEyepieceMode={isEyepieceMode}
        currCrowdName={isEmptyObject(currCrowd) ? "" : currCrowd.key}
        onCrowdSelection={onCrowdSelection}
        crowdNames={crowdNames}
      />
      <BodySelector
        onBodySelection={onBodySelection}
        currCrowd={currCrowd}
        currBodyName={isEmptyObject(currBody) ? "" : currBody.key}
      />
    </div>
  );
};

Selector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  crowdData: PropTypes.object.isRequired,
  currCrowd: PropTypes.object.isRequired,
  currBody: PropTypes.object.isRequired,
  onBodySelection: PropTypes.func.isRequired,
  onCrowdSelection: PropTypes.func.isRequired,
};

// because globalCanvasData does not have to update the Selector
export default memo(Selector);
