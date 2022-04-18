import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { Button } from "@mui/material";
import { getMode } from "../../store/slices/canvasSlice";
import ForecastPlaceholder from "./ForecastPlaceholder";

const ForecastButton = () => {
  const colors = useSelector(getColors);
  const isEyepieceMode = useSelector(getMode);
  const [buttonState, setButtonState] = useState(false);

  return (
    <div
      className={
        "border border-white rounded mb-1 col-3 bg-" + colors.background
      }
    >
      {buttonState ? (
        <ForecastPlaceholder />
      ) : (
        <div className="form-label-group mb-0 mt-2 justify-content-center">
          <Button
            onClick={() => setButtonState(prevState => !prevState)}
            variant="contained"
            color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
            size="small"
            style={{ fontSize: "12px" }}
          >
            Get Local Forecast
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForecastButton;
