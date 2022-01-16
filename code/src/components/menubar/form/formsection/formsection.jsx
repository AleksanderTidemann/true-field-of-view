import React, { useMemo, memo } from "react";
import FormModule from "./formmodule";
import PropTypes from "prop-types";
import colors from "../../../../data/color-data";

const FormSection = (props) => {
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
  const { isEyepieceMode, onFormInputChange, onFormSubmit } = props;

  console.log("formsection rendered");

  const submitBtnColor = useMemo(() => {
    let className = "btn ml-1 mb-1 " + colors.text + " bg-";
    className += isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return className;
  }, [isEyepieceMode]);

  return (
    <form className="d-flex" onSubmit={onFormSubmit}>
      <FormModule
        key="Tel"
        title="Telescope"
        formItems={[aperture, focallength, barlow]}
        isEyepieceMode={isEyepieceMode}
        onFormInputChange={onFormInputChange}
      />
      {isEyepieceMode ? (
        <FormModule
          key="Eye"
          title="Eyepiece"
          formItems={[eyepiecefocallength, eyepieceafov]}
          isEyepieceMode={isEyepieceMode}
          onFormInputChange={onFormInputChange}
        />
      ) : (
        <FormModule
          key="Cam"
          title="Camera"
          formItems={[pixelsize, resolutionx, resolutiony]}
          isEyepieceMode={isEyepieceMode}
          onFormInputChange={onFormInputChange}
        />
      )}
      <input className={submitBtnColor} type="submit" value="Plot!" />
    </form>
  );
};

FormSection.propTypes = {
  isEyepieceMode: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default memo(FormSection);
