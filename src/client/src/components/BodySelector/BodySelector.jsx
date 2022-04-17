import React from "react";
import Body from "./Body";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getXorBodyImg } from "../../utils/calc";
import { getCurrBodyName, getCurrCrowd } from "../../store/slices/crowdsSlice";

const BodySelector = ({ picWidth }) => {
  const currCrowd = useSelector(getCurrCrowd);
  const currBodyName = useSelector(getCurrBodyName);

  return (
    <div className="col-11 d-flex justify-content-around">
      {currCrowd.data.map(body => {
        let newBodyName = body.key;
        let bodyImgPath = getXorBodyImg(
          currCrowd.key,
          currBodyName,
          newBodyName
        );
        return (
          <Body
            name={newBodyName}
            key={newBodyName}
            imgPath={bodyImgPath}
            picWidth={picWidth}
          />
        );
      })}
    </div>
  );
};

BodySelector.propTypes = {
  picWidth: PropTypes.string.isRequired,
};

export default BodySelector;
