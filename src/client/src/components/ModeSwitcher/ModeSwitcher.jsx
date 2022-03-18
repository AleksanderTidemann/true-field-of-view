import React, { memo } from "react";
import colors from "../../data/color-data";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { switchMode } from "../../store/canvasData/canvasData";

const ModeSwitcher = ({ isEyepieceMode, onModeChange }) => {
  const dispatch = useDispatch();
  return (
    <BootstrapSwitchButton
      key="BootstrapSwitchButton"
      checked={isEyepieceMode}
      onlabel="Camera"
      onstyle={colors.eyepieceMode}
      offlabel="Eyepiece"
      offstyle={colors.cameraMode}
      onChange={bool => dispatch(switchMode(bool))}
      //   onChange={onModeChange}
      style={"w-100 mb-1 mt-2"}
    />
  );
};

ModeSwitcher.propTypes = {
  isEyepieceMode: PropTypes.bool.isRequired,
  onModeChange: PropTypes.func.isRequired,
};

export default memo(ModeSwitcher);
