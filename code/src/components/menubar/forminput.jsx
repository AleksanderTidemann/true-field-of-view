import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ items, onFormChange, addoncolor }) => (
  <div className="d-flex">
    {items.map((item) => {
      return (
        <div className="form-label-group" key={item.ref}>
          <input
            type={item.type}
            placeholder={item.name}
            id={item.ref}
            name={item.ref}
            onChange={onFormChange}
            value={item.value}
            required={item.required}
            className="form-control ml-2"
            aria-describedby="addon"
          />
          <label htmlFor={item.ref}>{item.name}</label>
          <div className="input-group-append">
            <span className={addoncolor} id={item.ref}>
              {item.unit}
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

FormInput.propTypes = {
  items: PropTypes.array.isRequired,
  onFormChange: PropTypes.func.isRequired,
  addoncolor: PropTypes.string.isRequired,
};

export default FormInput;
