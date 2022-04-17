import React from "react";
import colors from "../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useDispatch, useSelector } from "react-redux";
import {
  switchRedGrid,
  getMode,
  getHasGrid,
  getHasRedGrid,
} from "../../store/slices/canvasDataSlice";

const ReducedGridlines = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const hasGrid = useSelector(getHasGrid);
  const hasRedGrid = useSelector(getHasRedGrid);

  return (
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
          onChange={event => {
            dispatch(switchRedGrid(event.target.checked));
          }}
        />
      }
      label="Reduce Gridlines"
      labelPlacement="start"
    />
  );
};

export default ReducedGridlines;
