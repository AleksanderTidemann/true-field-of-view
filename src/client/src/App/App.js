import React, { useState, useEffect, useCallback } from "react";
import ModeSwitcher from "../components/ModeSwitcher/ModeSwitcher";
import FormSection from "../components/FormSection/FormSection";
import FormInfo from "../components/FormInfo/FormInfo";
import ForecastButton from "../components/Forecast/ForecastButton";
import CanvasOptions from "../components/CanvasOptions/CanvasOptions";
import SelectorPlaceholder from "../components/Selector/SelectorPlaceholder";
import CanvasPlaceholder from "../components/Canvas/CanvasPlaceholder";
import FORM_SCHEMA from "./formSchema.json";

import { useDispatch, useSelector } from "react-redux";
import { updateCanvasSize, getMode } from "../store/slices/canvasSlice";

const App = () => {
  const [formData, setFormData] = useState(FORM_SCHEMA);
  const [isSubmit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);

  // runs on mount, and everytime the mode is switched
  useEffect(() => {
    setFormData({ ...FORM_SCHEMA }); // reset the formdata
    setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
  }, [isEyepieceMode]);

  // update the canvas Size and shape on formSubmit.
  useEffect(() => {
    if (isSubmit) dispatch(updateCanvasSize(formData));
  }, [isSubmit, formData, dispatch]);

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
    <div className="App container p-0">
      <ModeSwitcher />
      <FormSection
        formData={formData}
        onFormInputChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <div className="d-flex">
        <FormInfo formData={formData} isSubmit={isSubmit} />
        <ForecastButton />
      </div>
      <CanvasOptions />
      <SelectorPlaceholder />
      <CanvasPlaceholder />
    </div>
  );
};

export default App;
