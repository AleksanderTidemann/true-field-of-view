import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const InfoInput = ({ isChanged, colors, name, value, borderColor }) => {
  const [textColor, setTextColor] = useState(null);

  // set textColor based on submit and if the info value has changed after a submit.
  useEffect(() => {
    isChanged ? setTextColor(colors.textMuted) : setTextColor(colors.text);
  }, [isChanged, colors]);

  return (
    <div className={"form-label-group mb-0 mt-2 " + colors.text}>
      <p className={"mr-1"}>
        <small>{name}</small>
      </p>
      <p
        className={
          "info-items text-center " +
          textColor +
          " " +
          "col-auto border rounded border-" +
          borderColor
        }
      >
        {value}
      </p>
    </div>
  );
};

InfoInput.propTypes = {
  isChanged: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default InfoInput;
