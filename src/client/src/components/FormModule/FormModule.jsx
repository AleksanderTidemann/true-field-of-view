import React from "react";
import FormInput from "./FormInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";

const FormModule = ({ formItems, onFormInputChange, title }) => {
  const colors = useSelector(getColors);

  // add API database fetch

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
        {formItems.map(formItem => (
          <FormInput
            key={formItem.ref}
            item={formItem}
            onFormInputChange={onFormInputChange}
          />
        ))}
      </div>
    </div>
  );
};

FormModule.propTypes = {
  formItems: PropTypes.array.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
};

export default FormModule;
