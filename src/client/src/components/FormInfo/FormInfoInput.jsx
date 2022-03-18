import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import colors from "../../data/color-data";

const FormInfoInput = ({ isChanged, title, value, borderColor }) => {
  const [textColor, setTextColor] = useState(null);

  // set textColor based on submit and if the info value has changed after a submit.
  useEffect(() => {
    isChanged ? setTextColor(colors.textMuted) : setTextColor(colors.text);
  }, [isChanged]);

  // compute the style
  const style = () => {
    let first = "info-items text-center " + textColor;
    let second = "col-auto border rounded border-" + borderColor;
    let result = first + " " + second;
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
  borderColor: PropTypes.string.isRequired,
};

export default memo(FormInfoInput);
