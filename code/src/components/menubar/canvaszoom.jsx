import React from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";

const INC = 10;
const CanvasZoom = (props) => {
  return (
    <Tooltip title={props.zoomValue + "%"} placement="bottom">
      <ButtonGroup
        variant="contained"
        size="small"
        color={
          props.isEyepieceMode
            ? props.colors.eyepieceMode
            : props.colors.cameraMode
        }
        className="mb-2 mt-1"
      >
        <Button
          onClick={() => {
            props.onZoomChange(
              props.zoomValue - INC <= 10 ? 10 : props.zoomValue - INC
            );
          }}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          onClick={() => {
            props.onZoomChange(
              props.zoomValue + INC > 100 ? 100 : props.zoomValue + INC
            );
          }}
        >
          <ZoomInIcon />
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
};

export default CanvasZoom;
