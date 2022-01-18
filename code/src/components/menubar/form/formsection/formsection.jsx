import React, { useMemo, memo } from "react";
import FormModule from "./formmodule";
import PropTypes from "prop-types";
import colors from "../../../../data/color-data";

const FormSection = ({
  formData,
  isEyepieceMode,
  onFormInputChange,
  onFormSubmit,
}) => {
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

  // return arrays of items
  // only when needed.
  const telModuleItems = useMemo(
    () => [aperture, focallength, barlow],
    [aperture, focallength, barlow]
  );

  const eyeModuleItems = useMemo(
    () => [eyepiecefocallength, eyepieceafov],
    [eyepiecefocallength, eyepieceafov]
  );

  const camModuleItems = useMemo(
    () => [pixelsize, resolutionx, resolutiony],
    [pixelsize, resolutionx, resolutiony]
  );

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
        formItems={telModuleItems}
        isEyepieceMode={isEyepieceMode}
        onFormInputChange={onFormInputChange}
      />
      {isEyepieceMode ? (
        <FormModule
          key="Eye"
          title="Eyepiece"
          formItems={eyeModuleItems}
          isEyepieceMode={isEyepieceMode}
          onFormInputChange={onFormInputChange}
        />
      ) : (
        <FormModule
          key="Cam"
          title="Camera"
          formItems={camModuleItems}
          isEyepieceMode={isEyepieceMode}
          onFormInputChange={onFormInputChange}
        />
      )}
      <input className={submitBtnColor} type="submit" value="Go!" />
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
