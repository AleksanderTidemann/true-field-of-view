import React, { useState, useEffect, useCallback } from "react";
import ModeSwitcher from "./modeswitcher/modeswitcher";
import FormSection from "./formsection/formsection";
import FormInfo from "./forminfo/forminfo";
import Forecast from "./forecast/forecast";
import CanvasOptions from "./canvasoptions/canvasoptions";
import initCanvasData from "../../data/canvas-data";
import initFormData from "../../data/form-data";
import * as calc from "../../utils/calc";
import PropTypes from "prop-types";

// label change and zoom does not have to update the forminfo

const Menubar = ({ setGlobalCanvasData }) => {
  const [localCanvasData, setLocalCanvasData] = useState(initCanvasData);
  const [formData, setFormData] = useState(initFormData);
  const [isSubmit, setSubmit] = useState(false);

  // Form
  // using callBacks to avoid giving the funcs new references on every render.
  const handleFormChange = useCallback((value, target) => {
    setFormData((prevData) => {
      let keyCopy = { ...prevData[target] };
      keyCopy.value = value;
      prevData[target] = keyCopy;
      return { ...prevData };
    });
    setSubmit((prevSubmit) => (prevSubmit ? false : prevSubmit));
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmit(true);
  }, []);

  // converts localCanvasData to globalCanvasData
  useEffect(() => {
    if (isSubmit) {
      setGlobalCanvasData((prevData) => ({
        hasLabels: prevData.hasLabels,
        zoomValue: prevData.zoomValue,
        ...localCanvasData,
      }));
    }
  }, [setGlobalCanvasData, localCanvasData, isSubmit]);

  // converts formData to localCanvasData
  useEffect(() => {
    let newFormDataInfo = [];
    if (localCanvasData.isEyepieceMode) {
      let epAFOV = calc.numberify(formData.eyepieceafov.value);
      let epFL = calc.numberify(formData.eyepiecefocallength.value);
      let FL = calc.numberify(formData.focallength.value);
      let b = calc.numberify(formData.barlow.value);

      let vars = [epAFOV, epFL, FL, b];

      // if there are no 0 value in any of the variables
      newFormDataInfo = vars.indexOf(0) === -1 ? calc.eye2canvas(...vars) : {};
    } else {
      let pxS = calc.numberify(formData.pixelsize.value);
      let resX = calc.numberify(formData.resolutionx.value);
      let resY = calc.numberify(formData.resolutiony.value);
      let FL = calc.numberify(formData.focallength.value);
      let b = calc.numberify(formData.barlow.value);

      let vars = [pxS, resX, resY, FL, b];

      // if there are no 0 values in any of the variables
      newFormDataInfo = vars.indexOf(0) === -1 ? calc.cam2canvas(...vars) : {};
    }

    if (Object.keys(newFormDataInfo).length) {
      setLocalCanvasData((prev) => ({
        ...prev,
        ...newFormDataInfo,
      }));
    }
  }, [formData, setLocalCanvasData, localCanvasData.isEyepieceMode]);

  // CanvasOptions
  const handleModeChange = useCallback(
    (bool) => {
      setLocalCanvasData({
        ...initCanvasData,
        isEyepieceMode: bool,
      });
      setGlobalCanvasData((prev) => ({
        ...initCanvasData,
        isEyepieceMode: bool,
      }));
      setFormData({ ...initFormData });
      setSubmit((prevSubmit) => (prevSubmit ? false : prevSubmit));
    },
    [setGlobalCanvasData]
  );

  const handleGridChange = useCallback(
    (bool) => {
      setLocalCanvasData((prev) => ({
        ...prev,
        hasGrid: bool,
      }));
      setGlobalCanvasData((prev) => ({
        ...prev,
        hasGrid: bool,
      }));
    },
    [setGlobalCanvasData]
  );

  const handleLabelChange = useCallback(
    (bool) => {
      setLocalCanvasData((prev) => ({
        ...prev,
        hasLabels: bool,
      }));
      setGlobalCanvasData((prev) => ({
        ...prev,
        hasLabels: bool,
      }));
    },
    [setGlobalCanvasData]
  );

  const handleRedGridChange = useCallback(
    (bool) => {
      setLocalCanvasData((prev) => ({
        ...prev,
        hasRedGrid: bool,
      }));
      setGlobalCanvasData((prev) => ({
        ...prev,
        hasRedGrid: bool,
      }));
    },
    [setGlobalCanvasData]
  );

  const handleZoomChange = useCallback(
    (val) => {
      setLocalCanvasData((prev) => ({
        ...prev,
        zoomValue: val,
      }));
      setGlobalCanvasData((prev) => ({
        ...prev,
        zoomValue: val,
      }));
    },
    [setGlobalCanvasData]
  );

  return (
    <div className="container p-0">
      <ModeSwitcher
        isEyepieceMode={localCanvasData.isEyepieceMode}
        onModeChange={handleModeChange}
      />
      {/* Instead of making sure the numbers are okay before converting formData, Cant I just make formData render only if there is a number there? */}
      {/* That would remvoe the necessity of having formData AND localCanvasData */}
      {/* Then, on submit, it would convert to the formData to the canvasData */}
      <FormSection
        isEyepieceMode={localCanvasData.isEyepieceMode}
        formData={formData}
        onFormInputChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <div className="d-flex">
        <FormInfo
          formData={formData}
          localCanvasData={localCanvasData}
          isSubmit={isSubmit}
        />
        <Forecast isEyepieceMode={localCanvasData.isEyepieceMode} />
      </div>
      <CanvasOptions
        zoomValue={localCanvasData.zoomValue}
        hasLabels={localCanvasData.hasLabels}
        isEyepieceMode={localCanvasData.isEyepieceMode}
        hasGrid={localCanvasData.hasGrid}
        hasRedGrid={localCanvasData.hasRedGrid}
        onZoomChange={handleZoomChange}
        onGridChange={handleGridChange}
        onLabelChange={handleLabelChange}
        onRedGridChange={handleRedGridChange}
      />
    </div>
  );
};

Menubar.propTypes = {
  setGlobalCanvasData: PropTypes.func.isRequired,
};

export default Menubar;
