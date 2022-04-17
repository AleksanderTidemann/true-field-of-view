import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { resetCurrBody } from "../../store/slices/crowdsSlice";
import {
  switchMode,
  getMode,
  resetCanvasData,
} from "../../store/slices/canvasSlice";

const ModeSwitcher = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const colors = useSelector(getColors);

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
