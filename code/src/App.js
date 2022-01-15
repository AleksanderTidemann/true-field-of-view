import React, { useEffect, useState } from "react";
import Menubar from "./components/menubar/menubar";
import Chart from "./components/chart/chart";
import { numberify, cam2canvas, eye2canvas } from "./utils/calc";
import initColorData from "./data/color-data";
import initCanvasData from "./data/canvas-data";
import initFormData from "./data/form-data";

const App = () => {
  const colors = initColorData;
  const [formData, setFormData] = useState(initFormData);
  const [formDataInfo, setFormDataInfo] = useState(initCanvasData);
  const [canvasData, setCanvasData] = useState(initCanvasData); // this is the same as formDataInfo, only updated less frequent

  // When changing the mode and adding any new form info,
  // the subitflag goes to false.
  const [isSubmit, setSubmit] = useState(false);

  const handleModeChange = (bool) => {
    setFormData(initFormData);
    setFormDataInfo({
      ...initCanvasData,
      isEyepieceMode: bool,
    });
    setCanvasData({
      ...initCanvasData,
      isEyepieceMode: bool,
    });
    // setPlanetData({ ...initPlanetData });
    if (isSubmit) setSubmit(false);
  };

  const handleGridChange = (bool) => {
    setFormDataInfo((prevFormDataInfo) => ({
      ...prevFormDataInfo,
      hasGrid: bool,
    }));

    setCanvasData((prevCanvasData) => ({
      ...prevCanvasData,
      hasGrid: bool,
    }));
  };

  const handleLabelChange = (bool) => {
    setFormDataInfo((prevFormDataInfo) => ({
      ...prevFormDataInfo,
      hasLabels: bool,
    }));

    setCanvasData((prevCanvasData) => ({
      ...prevCanvasData,
      hasLabels: bool,
    }));
  };

  const handleRedGridChange = (bool) => {
    setFormDataInfo((prevFormDataInfo) => ({
      ...prevFormDataInfo,
      hasRedGrid: bool,
    }));

    setCanvasData((prevCanvasData) => ({
      ...prevCanvasData,
      hasRedGrid: bool,
    }));
  };

  const handleZoomChange = (e) => {
    setFormDataInfo((prevFormDataInfo) => ({
      ...prevFormDataInfo,
      zoomValue: e,
    }));

    setCanvasData((prevCanvasData) => ({
      ...prevCanvasData,
      zoomValue: e,
    }));
  };

  const handleFormChange = (e) => {
    let newValue = e.target.value;
    let keyRef = e.target.id;
    let formDataCopy = { ...formData };
    let keyCopy = { ...formDataCopy[keyRef] };
    keyCopy.value = newValue;

    formDataCopy[keyRef] = keyCopy;

    setFormData(formDataCopy);

    if (isSubmit) setSubmit(false);
  };

  // For setting the rest of the FormInfoData when we have enough info the form
  useEffect(() => {
    let newFormDataInfo = [];
    if (formDataInfo.isEyepieceMode) {
      let epAFOV = numberify(formData.eyepieceafov.value);
      let epFL = numberify(formData.eyepiecefocallength.value);
      let FL = numberify(formData.focallength.value);
      let b = numberify(formData.barlow.value);

      let vars = [epAFOV, epFL, FL, b];

      // if there are no 0 value in any of the variables
      newFormDataInfo = vars.indexOf(0) === -1 ? eye2canvas(...vars) : {};
    } else {
      let pxS = numberify(formData.pixelsize.value);
      let resX = numberify(formData.resolutionx.value);
      let resY = numberify(formData.resolutiony.value);
      let FL = numberify(formData.focallength.value);
      let b = numberify(formData.barlow.value);

      let vars = [pxS, resX, resY, FL, b];

      // if there are no 0 values in any of the variables
      newFormDataInfo = vars.indexOf(0) === -1 ? cam2canvas(...vars) : {};
    }

    if (Object.keys(newFormDataInfo).length) {
      setFormDataInfo((prevFormDataInfo) => ({
        ...prevFormDataInfo,
        ...newFormDataInfo,
      }));
    }
  }, [
    formDataInfo.isEyepieceMode,
    formData.eyepieceafov.value,
    formData.eyepiecefocallength.value,
    formData.focallength.value,
    formData.barlow.value,
    formData.pixelsize.value,
    formData.resolutionx.value,
    formData.resolutiony.value,
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCanvasData({ ...formDataInfo });
    if (!isSubmit) setSubmit(true);
  };

  return (
    <React.StrictMode>
      <div className="App">
        <Menubar
          onFormInputChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
          onModeChange={handleModeChange}
          onGridChange={handleGridChange}
          onRedGridChange={handleRedGridChange}
          onLabelChange={handleLabelChange}
          onZoomChange={handleZoomChange}
          formData={formData}
          formDataInfo={formDataInfo}
          colors={colors}
          isSubmit={isSubmit}
        />
        <Chart canvasData={canvasData} colors={colors} />
      </div>
    </React.StrictMode>
  );
};

export default App;
