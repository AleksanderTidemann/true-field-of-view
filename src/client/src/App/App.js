import React, { useState, useEffect, useCallback } from "react";
import ModeSwitcher from "../components/ModeSwitcher/ModeSwitcher";
import FormSection from "../components/FormSection/FormSection";
import FormInfo from "../components/FormInfo/FormInfo";
import Forecast from "../components/Forecast/Forecast";
import Canvas from "../components/Canvas/Canvas";
import Selector from "../components/Selector/Selector";
import CanvasOptions from "../components/CanvasOptions/CanvasOptions";
import FORM_SCHEMA from "./formSchema";

import { useDispatch, useSelector } from "react-redux";
import { updateCanvasSize, getMode } from "../store/slices/canvasSlice";
import { loadCrowdData } from "../store/slices/crowdsSlice";

const App = () => {
  const [formData, setFormData] = useState(FORM_SCHEMA);
  const [isSubmit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);

  // on mount, get the default canvasData from the server.
  useEffect(() => {
    dispatch(loadCrowdData());
    // loadCanvasData()
  }, []);

  // runs on mount, and everytime the mode is switched
  useEffect(() => {
    setFormData({ ...FORM_SCHEMA });
    setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
  }, [isEyepieceMode]);

  useEffect(() => {
    if (isSubmit) {
      dispatch(updateCanvasSize(formData));
    }
  }, [isSubmit, formData]);

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
        <Forecast />
      </div>
      <CanvasOptions />
      <Selector />
      <Canvas />
    </div>
  );
};

export default App;
