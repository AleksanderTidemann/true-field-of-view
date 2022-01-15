import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasZoom from "./canvaszoom";
import PropTypes from "prop-types";

const CanvasOptions = ({
  colors,
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
      <FormGroup className={"justify-content-around " + colors.text} row>
        <FormControlLabel
          key="hasGrid"
          control={
            <Switch
              inputProps={{ "aria-label": "hasGrid" }}
              color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
              checked={hasGrid}
              onChange={(event) => {
                onGridChange(event.target.checked);
                if (!event.target.checked)
                  onRedGridChange(event.target.checked);
              }}
            />
          }
          label="Grid"
          labelPlacement="start"
        />
        <FormControlLabel
          key="Reduce Gridlines"
          control={
            <Switch
              disabled={!hasGrid}
              inputProps={{
                "aria-label": "Reduce Gridlines",
              }}
              color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
              checked={hasRedGrid}
              onChange={(event) => {
                onRedGridChange(event.target.checked);
              }}
            />
          }
          label="Reduce Gridlines"
          labelPlacement="start"
        />
        <FormControlLabel
          key="Labels"
          control={
            <Switch
              inputProps={{ "aria-label": "Labels" }}
              color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
              checked={hasLabels}
              onChange={(event) => {
                onLabelChange(event.target.checked);
              }}
            />
          }
          label="Labels"
          labelPlacement="start"
        />
        <CanvasZoom
          key="CanvasZoom"
          isEyepieceMode={isEyepieceMode}
          onZoomChange={onZoomChange}
          zoomValue={zoomValue}
          colors={colors}
        />
      </FormGroup>
    </div>
  );
};

CanvasOptions.propTypes = {
  colors: PropTypes.object.isRequired,
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

export default CanvasOptions;
