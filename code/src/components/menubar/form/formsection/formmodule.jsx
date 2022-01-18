import React, { useMemo, memo } from "react";
import FormInput from "./forminput";
import colors from "../../../../data/color-data";
import PropTypes from "prop-types";

const FormModule = ({
  formItems,
  onFormInputChange,
  isEyepieceMode,
  title,
}) => {
  const addonColor = useMemo(() => {
    let className = "input-group-text " + colors.text + " bg-";
    className += isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return className;
  }, [isEyepieceMode]);

  return (
    <div
      className={
        "form-group border border-white rounded ml-1 mb-1 col bg-" +
        colors.background
      }
    >
      <h2 className={"ml-2 mt-1 " + colors.text}>{title}</h2>
      {/* THIS IS WHERE THE DROPDOWN MENU ("FORMDROP") WILL GO */}
      <div className="d-flex">
        {formItems.map((formItem) => (
          <FormInput
            key={formItem.ref}
            item={formItem}
            addonColor={addonColor}
            onFormInputChange={onFormInputChange}
          />
        ))}
      </div>
    </div>
  );
};

FormModule.propTypes = {
  formItems: PropTypes.array.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
};

export default memo(FormModule);
