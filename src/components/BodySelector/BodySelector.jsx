import React from "react";
import Body from "./Body";
import { DIVIMAGES } from "../../data/img-data";
import PropTypes from "prop-types";

const bodyWidth = "35px";
const selectedx = DIVIMAGES.selectedX;

const BodySelector = ({ onBodySelection, currCrowd, currBodyName }) => (
  <div className="col-11 d-flex justify-content-around">
    {Object.keys(currCrowd).map(item => {
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
  </div>
);

BodySelector.propTypes = {
  onBodySelection: PropTypes.func.isRequired,
  currCrowd: PropTypes.object.isRequired,
  currBodyName: PropTypes.string.isRequired,
};

export default BodySelector;
