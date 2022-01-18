import React, { useState, useCallback } from "react";
import Form from "./form/form";
import CanvasOptions from "./canvasoptions/canvasoptions";
import ModeSwitcher from "./modeswitcher/modeswitcher";
import initCanvasData from "../../data/canvas-data";
import PropTypes from "prop-types";

const Menubar = ({ setGlobalCanvasData }) => {
  const [localCanvasData, setLocalCanvasData] = useState(initCanvasData);

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
      <Form
        setLocalCanvasData={setLocalCanvasData}
        setGlobalCanvasData={setGlobalCanvasData}
        localCanvasData={localCanvasData}
      />
      {/* 
      CanvasOptions should be memoized to avoid renders from
      converting formData to localCanvasData, which happens in <Form/> 
      */}
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
