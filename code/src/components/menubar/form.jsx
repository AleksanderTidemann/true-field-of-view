import React from "react";
import FormInput from "./forminput";
import PropTypes from "prop-types";

const Form = ({
  colors,
  isEyepieceMode,
  formData,
  onFormChange,
  onFormSubmit,
}) => {
  const SubmitBtnColor = () => {
    let className = "btn ml-1 mb-1 " + colors.text + " bg-";
    className += isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return className;
  };

  const inputAddonColor = () => {
    let className = "input-group-text " + colors.text + " bg-";
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
      <FormInput
        items={[formData.pixelsize, formData.resolutionx, formData.resolutiony]}
        addoncolor={inputAddonColor()}
        onFormChange={onFormChange}
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
      <FormInput
        items={[formData.eyepiecefocallength, formData.eyepieceafov]}
        addoncolor={inputAddonColor()}
        onFormChange={onFormChange}
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
        <FormInput
          items={[formData.aperture, formData.focallength, formData.barlow]}
          onFormChange={onFormChange}
          addoncolor={inputAddonColor()}
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
  onFormChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default Form;
