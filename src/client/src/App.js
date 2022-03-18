import React, { useState, useEffect, useCallback } from "react";
import ModeSwitcher from "./components/ModeSwitcher/ModeSwitcher";
import FormSection from "./components/FormSection/FormSection";
import FormInfo from "./components/FormInfo/FormInfo";
import Forecast from "./components/Forecast/Forecast";
import Canvas from "./components/Canvas/Canvas";
import Selector from "./components/Selector/Selector";
import CanvasOptions from "./components/CanvasOptions/CanvasOptions";
import initCanvasData from "./data/canvas-data";
import initFormData from "./data/form-data";
import * as calc from "./utils/calc";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

const App = () => {
  const [globalCanvasData, setGlobalCanvasData] = useState(initCanvasData);
  const [currBody, setCurrBody] = useState({});
  const [formData, setFormData] = useState(initFormData);
  const [isSubmit, setSubmit] = useState(false);

  // Menubar
  const handleFormChange = useCallback((value, target) => {
    // using callBacks to avoid giving the components new func references on every render.
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
    // dispatch(setSubmit(true))
    // dispatch(convertFormDataToCanvasData(formData))
  }, []);

  const handleModeChange = useCallback(
    bool => {
      // dispatch(setSubmit(false))
      setGlobalCanvasData(prev => ({
        ...initCanvasData,
        isEyepieceMode: bool,
      }));

      // these two setStates should subscribe to eyepieceMode and set when redux state changes.
      setFormData({ ...initFormData });
      setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
    },
    [setGlobalCanvasData]
  );

  // converts formData to globalCanvasData. this can actually happen on submit, as well
  useEffect(() => {
    let newCanvasData = [];
    if (globalCanvasData.isEyepieceMode) {
      let epAFOV = calc.numberify(formData.eyepieceafov.value);
      let epFL = calc.numberify(formData.eyepiecefocallength.value);
      let FL = calc.numberify(formData.focallength.value);
      let b = calc.numberify(formData.barlow.value);

      let vars = [epAFOV, epFL, FL, b];

      // if there are no 0 value in any of the variables
      newCanvasData = vars.indexOf(0) === -1 ? calc.eye2canvas(...vars) : {};
    } else {
      let pxS = calc.numberify(formData.pixelsize.value);
      let resX = calc.numberify(formData.resolutionx.value);
      let resY = calc.numberify(formData.resolutiony.value);
      let FL = calc.numberify(formData.focallength.value);
      let b = calc.numberify(formData.barlow.value);

      let vars = [pxS, resX, resY, FL, b];

      // if there are no 0 values in any of the variables
      newCanvasData = vars.indexOf(0) === -1 ? calc.cam2canvas(...vars) : {};
    }

    if (Object.keys(newCanvasData).length) {
      setGlobalCanvasData(prev => ({
        ...prev,
        ...newCanvasData,
      }));
    }
  }, [formData, setGlobalCanvasData, globalCanvasData.isEyepieceMode]);

  // Canvas
  // reset currBody when modeswitching
  useEffect(() => {
    setCurrBody({});
  }, [globalCanvasData.isEyepieceMode]);

  return (
    <Provider store={store}>
      <div className="App container p-0">
        <ModeSwitcher
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          onModeChange={handleModeChange}
        />
        <FormSection
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          formData={formData}
          onFormInputChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
        <div className="d-flex">
          <FormInfo
            formData={formData}
            globalCanvasData={globalCanvasData}
            isSubmit={isSubmit}
          />
          <Forecast isEyepieceMode={globalCanvasData.isEyepieceMode} />
        </div>
        <CanvasOptions
          globalCanvasData={globalCanvasData}
          setGlobalCanvasData={setGlobalCanvasData}
        />
        <Selector
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          currBody={currBody}
          setCurrBody={setCurrBody}
        />
        <Canvas globalCanvasData={globalCanvasData} currBody={currBody} />
      </div>
    </Provider>
  );
};

export default App;
