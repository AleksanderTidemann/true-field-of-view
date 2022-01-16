import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import colors from "../../../../data/color-data";

// maybe re-introduce formInput.
// it can reduce the rendering even more?

const FormModule = ({
  formItems,
  onFormInputChange,
  isEyepieceMode,
  title,
}) => {
  console.log("module", title, "rendered");

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
      <div className="d-flex">
        {formItems.map((formItem) => {
          return (
            <div className="form-label-group" key={formItem.ref}>
              <input
                type={formItem.type}
                placeholder={formItem.name}
                id={formItem.ref}
                name={formItem.ref}
                // {() => onformInputChange(value, id)}
                onChange={onFormInputChange}
                value={formItem.value}
                required={formItem.required}
                className="form-control ml-2"
                aria-describedby="addon"
              />
              <label htmlFor={formItem.ref}>{formItem.name}</label>
              <div className="input-group-append">
                <span className={addonColor} id={formItem.ref}>
                  {formItem.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FormModule.propTypes = {
  formItems: PropTypes.array.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  addonColor: PropTypes.string.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
};

export default memo(FormModule);
