import React from "react";
import colors from "../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useDispatch, useSelector } from "react-redux";
import {
  switchGrid,
  getMode,
  getHasGrid,
} from "../../store/slices/canvasDataSlice";

const Grid = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const hasGrid = useSelector(getHasGrid);

  return (
    <FormControlLabel
      key="hasGrid"
      control={
        <Switch
          inputProps={{ "aria-label": "hasGrid" }}
          color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
          checked={hasGrid}
          onChange={event => {
            dispatch(switchGrid(event.target.checked));
          }}
        />
      }
      label="Grid"
      labelPlacement="start"
    />
  );
};

export default Grid;
