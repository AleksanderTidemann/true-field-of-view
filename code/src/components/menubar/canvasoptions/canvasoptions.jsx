import React, { memo } from "react";
import Grid from "./grid";
import ReducedGridlines from "./reducedgridlines";
import Labels from "./labels";
import Zoom from "./zoom";
import colors from "../../../data/color-data";
import PropTypes from "prop-types";

const CanvasOptions = ({
  zoomValue,
  hasLabels,
  isEyepieceMode,
  hasGrid,
  hasRedGrid,
  onZoomChange,
  onGridChange,
  onLabelChange,
  onRedGridChange,
}) => {
  return (
    <div className={"border border-white rounded mb-1 bg-" + colors.background}>
      <div className={"d-flex justify-content-around " + colors.text}>
        <Grid
          hasGrid={hasGrid}
          isEyepieceMode={isEyepieceMode}
          onGridChange={onGridChange}
          onRedGridChange={onRedGridChange}
        />
        <ReducedGridlines
          hasGrid={hasGrid}
          hasRedGrid={hasRedGrid}
          isEyepieceMode={isEyepieceMode}
          onRedGridChange={onRedGridChange}
        />
        <Labels
          hasLabels={hasLabels}
          isEyepieceMode={isEyepieceMode}
          onLabelChange={onLabelChange}
        />
        <Zoom
          isEyepieceMode={isEyepieceMode}
          onZoomChange={onZoomChange}
          zoomValue={zoomValue}
        />
      </div>
    </div>
  );
};

CanvasOptions.propTypes = {
  zoomValue: PropTypes.number.isRequired,
  hasLabels: PropTypes.bool.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  hasGrid: PropTypes.bool.isRequired,
  hasRedGrid: PropTypes.bool.isRequired,
  onZoomChange: PropTypes.func.isRequired,
  onGridChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onRedGridChange: PropTypes.func.isRequired,
};

export default memo(CanvasOptions);
