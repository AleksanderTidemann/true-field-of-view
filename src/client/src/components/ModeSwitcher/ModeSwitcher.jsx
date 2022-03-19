import React, { memo } from "react";
import colors from "../../data/color-data";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { useDispatch, useSelector } from "react-redux";
import { switchMode, getMode } from "../../store/canvasData/canvasData";

const ModeSwitcher = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);

  return (
    <BootstrapSwitchButton
      key="BootstrapSwitchButton"
      checked={isEyepieceMode}
      onlabel="Camera"
      onstyle={colors.eyepieceMode}
      offlabel="Eyepiece"
      offstyle={colors.cameraMode}
      onChange={bool => dispatch(switchMode(bool))}
      style={"w-100 mb-1 mt-2"}
    />
  );
};

export default memo(ModeSwitcher);
