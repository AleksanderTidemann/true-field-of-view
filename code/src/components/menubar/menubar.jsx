import React, { useState } from "react";
import Form from "./form/form";
import CanvasOptions from "./canvasoptions/canvasoptions";
import ModeSwitcher from "./modeswitcher/modeswitcher";
import initCanvasData from "../../data/canvas-data";
import PropTypes from "prop-types";

const Menubar = ({ setGlobalCanvasData }) => {
  const [formDataInfo, setFormDataInfo] = useState(initCanvasData);

  // useeffect på submit true.
  const handleModeChange = (bool) => {
    setFormDataInfo({
      ...initCanvasData,
      isEyepieceMode: bool,
    });
    setGlobalCanvasData((prev) => ({
      ...prev,
      isEyepieceMode: bool,
    }));
  };

  const handleGridChange = (bool) => {
    setFormDataInfo((prev) => ({
      ...prev,
      hasGrid: bool,
    }));
    setGlobalCanvasData((prev) => ({
      ...prev,
      hasGrid: bool,
    }));
  };

  const handleLabelChange = (bool) => {
    setFormDataInfo((prev) => ({
      ...prev,
      hasLabels: bool,
    }));
    setGlobalCanvasData((prev) => ({
      ...prev,
      hasLabels: bool,
    }));
  };

  const handleRedGridChange = (bool) => {
    setFormDataInfo((prev) => ({
      ...prev,
      hasRedGrid: bool,
    }));
    setGlobalCanvasData((prev) => ({
      ...prev,
      hasRedGrid: bool,
    }));
  };

  const handleZoomChange = (val) => {
    setFormDataInfo((prev) => ({
      ...prev,
      zoomValue: val,
    }));
    setGlobalCanvasData((prev) => ({
      ...prev,
      zoomValue: val,
    }));
  };

  const handleFormSubmit = () => {
    setGlobalCanvasData({ ...formDataInfo });
  };

  return (
    <div className="container p-0">
      <ModeSwitcher
        isEyepieceMode={formDataInfo.isEyepieceMode}
        onModeChange={handleModeChange}
      />
      <Form
        onFormSubmit={handleFormSubmit}
        setFormDataInfo={setFormDataInfo}
        formDataInfo={formDataInfo}
      />
      <CanvasOptions
        zoomValue={formDataInfo.zoomValue}
        hasLabels={formDataInfo.hasLabels}
        isEyepieceMode={formDataInfo.isEyepieceMode}
        hasGrid={formDataInfo.hasGrid}
        hasRedGrid={formDataInfo.hasRedGrid}
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
