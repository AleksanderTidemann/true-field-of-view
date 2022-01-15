import React from "react";
import FormSection from "./formsection";
import PropTypes from "prop-types";

const Form = (props) => {
  const {
    aperture,
    focallength,
    barlow,
    eyepieceafov,
    eyepiecefocallength,
    pixelsize,
    resolutionx,
    resolutiony,
  } = props.formData;
  const { colors, isEyepieceMode, onFormInputChange, onFormSubmit } = props;

  console.log("Form renders");

  const SubmitBtnColor = () => {
    let className = "btn ml-1 mb-1 " + colors.text + " bg-";
    className += isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return className;
  };

  const getCamSection = () => (
    <div
      className={
        "form-group border border-white rounded ml-1 mb-1 col bg-" +
        colors.background
      }
    >
      <h2 className={"ml-2 mt-1 " + colors.text}>Camera</h2>
      <FormSection
        key="Cam"
        colors={colors}
        isEyepieceMode={isEyepieceMode}
        formItems={[pixelsize, resolutionx, resolutiony]}
        onFormInputChange={onFormInputChange}
      />
    </div>
  );

  const getEyeSection = () => (
    <div
      className={
        "form-group border border-white rounded ml-1 mb-1 col bg-" +
        colors.background
      }
    >
      <h2 className={"ml-2 mt-1 " + colors.text}>Eyepiece</h2>
      <FormSection
        key="Eye"
        colors={colors}
        isEyepieceMode={isEyepieceMode}
        formItems={[eyepiecefocallength, eyepieceafov]}
        onFormInputChange={onFormInputChange}
      />
    </div>
  );

  return (
    <form className="d-flex" onSubmit={onFormSubmit}>
      <div
        className={
          "form-group border border-white rounded mb-1 col bg-" +
          colors.background
        }
      >
        <h2 className={"ml-2 mt-1 " + colors.text}>Telescope</h2>
        <FormSection
          key="Telescope"
          colors={colors}
          isEyepieceMode={isEyepieceMode}
          formItems={[aperture, focallength, barlow]}
          onFormInputChange={onFormInputChange}
        />
      </div>
      {isEyepieceMode ? getEyeSection() : getCamSection()}
      <input className={SubmitBtnColor()} type="submit" value="Plot!" />
    </form>
  );
};

Form.propTypes = {
  colors: PropTypes.object.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default Form;
