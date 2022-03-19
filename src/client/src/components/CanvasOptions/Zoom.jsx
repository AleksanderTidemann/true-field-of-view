import React from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import colors from "../../data/color-data";

import { useDispatch, useSelector } from "react-redux";
import {
  zoomInn,
  zoomOut,
  getMode,
  getZoomValue,
} from "../../store/canvasData/canvasData";

const Zoom = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const zoomValue = useSelector(getZoomValue);

  return (
    <Tooltip title={zoomValue + "%"} placement="bottom">
      <ButtonGroup
        variant="contained"
        size="small"
        color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
        className="mb-2 mt-1"
      >
        <Button
          onClick={() => {
            dispatch(zoomOut());
          }}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          onClick={() => {
            dispatch(zoomInn());
          }}
        >
          <ZoomInIcon />
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
};

export default Zoom;
