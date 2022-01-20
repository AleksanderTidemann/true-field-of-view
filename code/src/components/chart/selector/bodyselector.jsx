import React from "react";
import Body from "./body";
import { DIVIMAGES } from "../../../data/img-data";
import PropTypes from "prop-types";

const bodyWidth = "35px";
const selectedx = DIVIMAGES.selectedX;

const BodySelector = ({ onBodySelection, currCrowd, currBodyName }) => (
  <>
    {Object.keys(currCrowd).map((item) => {
      if (item === "key") return "";
      let bodyName = currCrowd[item].key;
      return (
        <Body
          name={bodyName}
          key={bodyName}
          img={bodyName === currBodyName ? selectedx : currCrowd[item].img}
          onBodySelection={onBodySelection}
          bodyWidth={bodyWidth}
        />
      );
    })}
  </>
);

BodySelector.propTypes = {
  onBodySelection: PropTypes.func.isRequired,
  currCrowd: PropTypes.object.isRequired,
  currBodyName: PropTypes.string.isRequired,
};

export default BodySelector;
