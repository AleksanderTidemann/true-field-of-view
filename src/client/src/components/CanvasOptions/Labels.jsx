import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import {
  switchLabel,
  getMode,
  getHasLabels,
} from "../../store/slices/canvasSlice";

const Labels = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const hasLabels = useSelector(getHasLabels);
  const colors = useSelector(getColors);

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
