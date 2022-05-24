import React, { useState, useEffect, useCallback } from "react";
import Form from "../Form/Form";
import FormInfo from "../FormInfo/FormInfo";
import ForecastButton from "../Forecast/ForecastButton";
import FORM_SCHEMA from "./formDataSchema.json";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEyeCanvas,
  updateCamCanvas,
  getMode,
} from "../../store/slices/canvasSlice";

const FormSection = () => {
  const [formData, setFormData] = useState(FORM_SCHEMA);
  const [isSubmit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);

  // runs on mount, and everytime the mode is switched
  useEffect(() => {
    setFormData({ ...FORM_SCHEMA }); // reset the formdata
    setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
  }, [isEyepieceMode]);

  // update the canvas dim and res on formSubmit
  useEffect(() => {
    if (isSubmit) {
      isEyepieceMode
        ? dispatch(updateEyeCanvas(formData))
        : dispatch(updateCamCanvas(formData));
    }
  }, [isSubmit, formData, dispatch, isEyepieceMode]);

  // using callBacks to avoid giving the components new func references on every render.
  const handleFormChange = useCallback((value, target) => {
    setFormData(prevData => {
      let keyCopy = { ...prevData[target] };
      keyCopy.value = value;
      prevData[target] = keyCopy;
      return { ...prevData };
    });
    setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
  }, []);

  const handleFormSubmit = useCallback(value => {
    value.preventDefault();
    setSubmit(true);
  }, []);

  return (
    <>
      <Form
        formData={formData}
        onFormInputChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <div className="d-flex">
        <FormInfo formData={formData} isSubmit={isSubmit} />
        <ForecastButton />
      </div>
    </>
  );
};

export default FormSection;
