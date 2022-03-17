import React, { memo } from "react";
import Grid from "./grid";
import ReducedGridlines from "./reducedgridlines";
import Labels from "./labels";
import Zoom from "./zoom";
import colors from "../../../data/color-data";
import PropTypes from "prop-types";

const CanvasOptions = ({ globalCanvasData, setGlobalCanvasData }) => {
  const handleGridChange = bool => {
    setGlobalCanvasData(prev => ({
      ...prev,
      hasGrid: bool,
    }));
  };

  const handleLabelChange = bool => {
    setGlobalCanvasData(prev => ({
      ...prev,
      hasLabels: bool,
    }));
  };

  const handleRedGridChange = bool => {
    setGlobalCanvasData(prev => ({
      ...prev,
      hasRedGrid: bool,
    }));
  };

  const handleZoomChange = val => {
    setGlobalCanvasData(prev => ({
      ...prev,
      zoomValue: val,
    }));
  };

  return (
    <div className={"border border-white rounded mb-1 bg-" + colors.background}>
      <div className={"d-flex justify-content-around " + colors.text}>
        <Grid
          hasGrid={globalCanvasData.hasGrid}
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          onGridChange={handleGridChange}
          onRedGridChange={handleRedGridChange}
        />
        <ReducedGridlines
          hasGrid={globalCanvasData.hasGrid}
          hasRedGrid={globalCanvasData.hasRedGrid}
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          onRedGridChange={handleRedGridChange}
        />
        <Labels
          hasLabels={globalCanvasData.hasLabels}
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          onLabelChange={handleLabelChange}
        />
        <Zoom
          isEyepieceMode={globalCanvasData.isEyepieceMode}
          zoomValue={globalCanvasData.zoomValue}
          onZoomChange={handleZoomChange}
        />
      </div>
    </div>
  );
};

CanvasOptions.propTypes = {
  globalCanvasData: PropTypes.object.isRequired,
  setGlobalCanvasData: PropTypes.func.isRequired,
};

export default memo(CanvasOptions);
