import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ formItem, onFormInputChange, addonColor }) => {
  return (
    <div className="form-label-group" key={formItem.ref}>
      <input
        type={formItem.type}
        placeholder={formItem.name}
        id={formItem.ref}
        name={formItem.ref}
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
};

FormInput.propTypes = {
  formItem: PropTypes.object.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
  addonColor: PropTypes.string.isRequired,
};

export default FormInput;
