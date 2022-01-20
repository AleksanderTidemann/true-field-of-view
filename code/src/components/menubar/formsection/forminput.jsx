import React, { memo } from "react";
import PropTypes from "prop-types";

const FormInput = ({ item, addonColor, onFormInputChange }) => {
  return (
    <div className="form-label-group" key={item.ref}>
      <input
        type={item.type}
        placeholder={item.name}
        id={item.ref}
        name={item.ref}
        onChange={(e) => onFormInputChange(e.target.value, e.target.id)}
        value={item.value}
        required={item.required}
        className="form-control ml-2"
        aria-describedby="addon"
      />
      <label htmlFor={item.ref}>{item.name}</label>
      <div className="input-group-append">
        <span className={addonColor} id={item.ref}>
          {item.unit}
        </span>
      </div>
    </div>
  );
};

FormInput.propTypes = {
  item: PropTypes.object.isRequired,
  addonColor: PropTypes.string.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
};

export default memo(FormInput);
