import React, { memo } from "react";
import colors from "../../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";

const Grid = ({ hasGrid, isEyepieceMode, onGridChange, onRedGridChange }) => {
  return (
    <FormControlLabel
      key="hasGrid"
      control={
        <Switch
          inputProps={{ "aria-label": "hasGrid" }}
          color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
          checked={hasGrid}
          onChange={(event) => {
            onGridChange(event.target.checked);
            if (!event.target.checked) onRedGridChange(event.target.checked);
          }}
        />
      }
      label="Grid"
      labelPlacement="start"
    />
  );
};

Grid.propTypes = {
  hasGrid: PropTypes.bool.isRequired,
  isEyepieceMode: PropTypes.bool.isRequired,
  onGridChange: PropTypes.func.isRequired,
  onRedGridChange: PropTypes.func.isRequired,
};

export default memo(Grid);
