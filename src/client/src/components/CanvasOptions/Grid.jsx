import React, { memo } from "react";
import colors from "../../data/color-data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { switchGrid } from "../../store/canvasData/canvasData";

const Grid = ({ hasGrid, isEyepieceMode, onGridChange, onRedGridChange }) => {
  const dispatch = useDispatch();
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
