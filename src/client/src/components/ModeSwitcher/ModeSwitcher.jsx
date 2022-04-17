import React from "react";
import colors from "../../data/color-data";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { useDispatch, useSelector } from "react-redux";
import {
  switchMode,
  getMode,
  resetCanvasData,
} from "../../store/slices/canvasDataSlice";
import { resetCurrBody } from "../../store/slices/crowdsSlice";

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
      onChange={bool => {
        dispatch(switchMode(bool));
        dispatch(resetCurrBody());
        dispatch(resetCanvasData());
      }}
      style={"w-100 mb-1 mt-2"}
    />
  );
};

export default ModeSwitcher;
