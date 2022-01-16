import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import colors from "../../../../data/color-data";

const FormInfoInput = ({ isChanged, name, value, borderColor }) => {
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

FormInfoInput.propTypes = {
  isChanged: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default FormInfoInput;
