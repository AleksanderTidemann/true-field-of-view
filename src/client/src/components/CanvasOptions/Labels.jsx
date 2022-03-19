import React from "react";
import colors from "../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useDispatch, useSelector } from "react-redux";
import {
  switchLabel,
  getMode,
  getHasLabels,
} from "../../store/canvasData/canvasData";

const Labels = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const hasLabels = useSelector(getHasLabels);

  return (
    <FormControlLabel
      key="Labels"
      control={
        <Switch
          inputProps={{ "aria-label": "Labels" }}
          color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
          checked={hasLabels}
          onChange={event => {
            dispatch(switchLabel(event.target.checked));
          }}
        />
      }
      label="Labels"
      labelPlacement="start"
    />
  );
};

export default Labels;
