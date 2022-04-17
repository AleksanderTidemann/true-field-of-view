import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import {
  switchGrid,
  getMode,
  getHasGrid,
} from "../../store/slices/canvasSlice";

const Grid = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const hasGrid = useSelector(getHasGrid);
  const colors = useSelector(getColors);

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
