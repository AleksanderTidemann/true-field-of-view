import React, { memo } from "react";
import colors from "../../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";

const ReducedGridlines = ({
  hasRedGrid,
  hasGrid,
  isEyepieceMode,
  onRedGridChange,
}) => {
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
            onRedGridChange(event.target.checked);
          }}
        />
      }
      label="Reduce Gridlines"
      labelPlacement="start"
    />
  );
};

ReducedGridlines.propTypes = {
  hasGrid: PropTypes.bool.isRequired,
  hasRedGrid: PropTypes.bool.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  onRedGridChange: PropTypes.func.isRequired,
};

export default memo(ReducedGridlines);
