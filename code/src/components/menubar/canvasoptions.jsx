import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasZoom from "./canvaszoom";

const CanvasOptions = (props) => {
  return (
    <div
      className={
        "border border-white rounded mb-1 bg-" + props.colors.background
      }
    >
      <FormGroup className={"justify-content-around " + props.colors.text} row>
        <FormControlLabel
          control={
            <Switch
              inputProps={{ "aria-label": "hasGrid" }}
              color={
                props.isEyepieceMode
                  ? props.colors.eyepieceMode
                  : props.colors.cameraMode
              }
              checked={props.hasGrid}
              onChange={(event) => {
                props.onGridChange(event.target.checked);
                if (!event.target.checked)
                  props.onRedGridChange(event.target.checked);
              }}
            />
          }
          label="Grid"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              disabled={!props.hasGrid}
              inputProps={{
                "aria-label": "Reduce Gridlines",
              }}
              color={
                props.isEyepieceMode
                  ? props.colors.eyepieceMode
                  : props.colors.cameraMode
              }
              checked={props.hasRedGrid}
              onChange={(event) => {
                props.onRedGridChange(event.target.checked);
              }}
            />
          }
          label="Reduce Gridlines"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              inputProps={{ "aria-label": "Labels" }}
              color={
                props.isEyepieceMode
                  ? props.colors.eyepieceMode
                  : props.colors.cameraMode
              }
              checked={props.hasLabels}
              onChange={(event) => {
                props.onLabelChange(event.target.checked);
              }}
            />
          }
          label="Labels"
          labelPlacement="start"
        />
        <CanvasZoom
          isEyepieceMode={props.isEyepieceMode}
          onZoomChange={props.onZoomChange}
          zoomValue={props.zoomValue}
          colors={props.colors}
        />
      </FormGroup>
    </div>
  );
};

export default CanvasOptions;
