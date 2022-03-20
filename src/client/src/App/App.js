import React, { useState, useEffect, useCallback } from "react";
import ModeSwitcher from "../components/ModeSwitcher/ModeSwitcher";
import FormSection from "../components/FormSection/FormSection";
import FormInfo from "../components/FormInfo/FormInfo";
import Forecast from "../components/Forecast/Forecast";
import Canvas from "../components/Canvas/Canvas";
import Selector from "../components/Selector/Selector";
import CanvasOptions from "../components/CanvasOptions/CanvasOptions";
import DEFAULT_FORM_DATA from "./defaultFormData";

import { useDispatch, useSelector } from "react-redux";
import { calculcateCanvasSize, getMode } from "../store/canvasData/canvasData";

const App = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [currBody, setCurrBody] = useState({});
  const [isSubmit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);

  useEffect(() => {
    if (isSubmit) {
      dispatch(calculcateCanvasSize(formData));
    }
  }, [isSubmit, formData]);

  useEffect(() => {
    setCurrBody({});
    setFormData({ ...DEFAULT_FORM_DATA });
    setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
  }, [isEyepieceMode]);

  const handleFormChange = useCallback((value, target) => {
    // using callBacks to avoid giving the
    // components new func references on every render.
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
      <Selector currBody={currBody} setCurrBody={setCurrBody} />
      <Canvas currBody={currBody} />
    </div>
  );
};

export default App;
