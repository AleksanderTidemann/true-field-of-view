import React from "react";
import FormInput from "./forminput";
import PropTypes from "prop-types";

const FormSection = ({
  colors,
  isEyepieceMode,
  formItems,
  onFormInputChange,
}) => {
  const addonColor = () => {
    let className = "input-group-text " + colors.text + " bg-";
    className += isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return className;
  };
  return (
    <div className="d-flex">
      {formItems.map((formItem) => {
        return (
          <FormInput
            key={formItem.ref}
            formItem={formItem}
            onFormInputChange={onFormInputChange}
            addonColor={addonColor()}
          />
        );
      })}
    </div>
  );
};

FormSection.propTypes = {
  colors: PropTypes.object.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  formItems: PropTypes.array.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
};

export default FormSection;
