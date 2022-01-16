import React from "react";
import Body from "./body";
import { DIVIMAGES } from "../../../data/img-data";
import PropTypes from "prop-types";

const bodyWidth = "35px";
const loading = DIVIMAGES.loading;
const error = DIVIMAGES.error;
const selectedx = DIVIMAGES.selectedX;

const BodySelector = ({
  isLoading,
  isError,
  onBodySelection,
  currCrowd,
  currBodyName,
}) => {
  return (
    <>
      {isError ? (
        <img src={error} alt="ERROR..." width={bodyWidth} height={bodyWidth} />
      ) : isLoading ? (
        <img
          src={loading}
          alt="loading..."
          width={bodyWidth}
          height={bodyWidth}
        />
      ) : (
        <>
          {Object.keys(currCrowd).map((item) => {
            if (item === "key") return "";
            let bodyName = currCrowd[item].key;
            return (
              <Body
                name={bodyName}
                key={bodyName}
                img={
                  bodyName === currBodyName ? selectedx : currCrowd[item].img
                }
                onBodySelection={onBodySelection}
                bodyWidth={bodyWidth}
              />
            );
          })}
        </>
      )}
    </>
  );
};

BodySelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onBodySelection: PropTypes.func.isRequired,
  currCrowd: PropTypes.object.isRequired,
};

export default BodySelector;
