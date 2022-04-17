import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { getMode } from "../../store/slices/canvasSlice";

import PropTypes from "prop-types";

const FormInfoInput = ({ isChanged, title, value }) => {
  const [textColor, setTextColor] = useState(null);
  const colors = useSelector(getColors);
  const isEyepieceMode = useSelector(getMode);

  // set textColor based on submit and if the info value has changed after a submit.
  useEffect(() => {
    isChanged ? setTextColor(colors.textMuted) : setTextColor(colors.text);
  }, [isChanged, colors]);

  // compute the style
  const style = () => {
    let first = "info-items text-center " + textColor;
    let second = "col-auto border rounded border-";
    let third = isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    let result = first + " " + second + third;
    return result;
  };

  return (
    <div className={"form-label-group mb-0 mt-2 " + colors.text}>
      <p className={"mr-1"}>
        <small>{title}</small>
      </p>
      <p className={style()}>{value}</p>
    </div>
  );
};

FormInfoInput.propTypes = {
  isChanged: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default memo(FormInfoInput);
