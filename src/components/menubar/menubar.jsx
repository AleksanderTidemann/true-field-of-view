import React, { useState, useEffect, useCallback } from "react";
import ModeSwitcher from "./modeswitcher/modeswitcher";
import FormSection from "./formsection/formsection";
import FormInfo from "./forminfo/forminfo";
import Forecast from "./forecast/forecast";
import CanvasOptions from "../chart/canvasoptions/canvasoptions";
import initCanvasData from "../../data/canvas-data";
import initFormData from "../../data/form-data";
import * as calc from "../../utils/calc";
import PropTypes from "prop-types";

// label change and zoom does not have to update the forminfo

const Menubar = ({ setGlobalCanvasData, globalCanvasData }) => {
  const [formData, setFormData] = useState(initFormData);
  const [isSubmit, setSubmit] = useState(false);

  // Form
  // using callBacks to avoid giving the funcs new references on every render.
  const handleFormChange = useCallback((value, target) => {
    setFormData(prevData => {
      let keyCopy = { ...prevData[target] };
      keyCopy.value = value;
      prevData[target] = keyCopy;
      return { ...prevData };
    });
    setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
  }, []);

  const handleFormSubmit = useCallback(e => {
    e.preventDefault();
    setSubmit(true);
  }, []);

  // converts formData to globalCanvasData
  // this can happen on submit, as well
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

  // switching views
  // reset data, basically
  const handleModeChange = useCallback(
    bool => {
      setGlobalCanvasData(prev => ({
        ...initCanvasData,
        isEyepieceMode: bool,
      }));
      setFormData({ ...initFormData });
      setSubmit(prevSubmit => (prevSubmit ? false : prevSubmit));
    },
    [setGlobalCanvasData]
  );

  return (
    <div className="container p-0">
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
      {/* <CanvasOptions
        globalCanvasData={globalCanvasData}
        setGlobalCanvasData={setGlobalCanvasData}
      /> */}
    </div>
  );
};

Menubar.propTypes = {
  setGlobalCanvasData: PropTypes.func.isRequired,
};

export default Menubar;
