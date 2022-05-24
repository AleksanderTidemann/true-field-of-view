import React from "react";
import FormModule from "../FormModule/FormModule";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { getMode } from "../../store/slices/canvasSlice";

const Form = ({ formData, onFormInputChange, onFormSubmit }) => {
  const {
    aperture,
    focallength,
    barlow,
    eyepieceafov,
    eyepiecefocallength,
    pixelsize,
    resolutionx,
    resolutiony,
  } = formData;

  const isEyepieceMode = useSelector(getMode);
  const colors = useSelector(getColors);

  const submitBtnColor = () => {
    let className = "btn ml-1 mb-1 " + colors.text + " bg-";
    className += isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return className;
  };

  return (
    <form className="d-flex" onSubmit={onFormSubmit}>
      <FormModule
        key="Tel"
        title="Telescope"
        formItems={[aperture, focallength, barlow]}
        onFormInputChange={onFormInputChange}
      />
      {isEyepieceMode ? (
        <FormModule
          key="Eye"
          title="Eyepiece"
          formItems={[eyepiecefocallength, eyepieceafov]}
          onFormInputChange={onFormInputChange}
        />
      ) : (
        <FormModule
          key="Cam"
          title="Camera"
          formItems={[pixelsize, resolutionx, resolutiony]}
          onFormInputChange={onFormInputChange}
        />
      )}
      <input className={submitBtnColor()} type="submit" value="Go!" />
    </form>
  );
};

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default Form;
