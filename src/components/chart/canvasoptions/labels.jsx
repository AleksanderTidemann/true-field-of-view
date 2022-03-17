import React, { memo } from "react";
import colors from "../../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";

const Labels = ({ hasLabels, isEyepieceMode, onLabelChange }) => {
  return (
    <FormControlLabel
      key="Labels"
      control={
        <Switch
          inputProps={{ "aria-label": "Labels" }}
          color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
          checked={hasLabels}
          onChange={event => {
            onLabelChange(event.target.checked);
          }}
        />
      }
      label="Labels"
      labelPlacement="start"
    />
  );
};

Labels.propTypes = {
  hasLabels: PropTypes.bool.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  onLabelChange: PropTypes.func.isRequired,
};

export default memo(Labels);
