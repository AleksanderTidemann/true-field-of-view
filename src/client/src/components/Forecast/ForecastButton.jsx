import React, { useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { getMode } from "../../store/slices/canvasSlice";
import getUserCoords from "./getUserCoords";
import ForecastPlaceholder from "./ForecastPlaceholder";

const btnFontSize = "9px";

const ForecastButton = () => {
  const colors = useSelector(getColors);
  const isEyepieceMode = useSelector(getMode);
  const [buttonClick, setButtonClick] = useState(false);
  const [userCoords, setUserCoords] = useState({});

  const handleClick = () => {
    const getGeolocation = async () => {
      try {
        const { lat, long } = await getUserCoords();
        setUserCoords({ lat, long });
        setButtonClick(true);
      } catch (error) {
        console.log(error.message);
        setButtonClick(false);
        setUserCoords({});
      }
    };
    getGeolocation();
  };

  return (
    <div
      className={
        "border border-white rounded mb-1 col-3 bg-" + colors.background
      }
    >
      <div className="form-label-group mb-0 mt-2 justify-content-center">
        {buttonClick ? (
          <ForecastPlaceholder userCoords={userCoords} />
        ) : (
          <Button
            onClick={handleClick}
            variant="contained"
            color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
            size="small"
            style={{ fontSize: btnFontSize }}
          >
            Get Local Forecast
          </Button>
        )}
      </div>
    </div>
  );
};

export default ForecastButton;
