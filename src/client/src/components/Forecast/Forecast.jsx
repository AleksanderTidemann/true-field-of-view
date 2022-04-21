import React, { useEffect, useState } from "react";
import { getImgPath } from "../../utils/calc";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { getMode } from "../../store/slices/canvasSlice";

const Forecast = ({ forecastData, picWidth }) => {
  const [forecastImg, setForecastImg] = useState("");
  const isEyepieceMode = useSelector(getMode);
  const colors = useSelector(getColors);

  useEffect(() => {
    setForecastImg(
      getImgPath("weather", forecastData.next6h_symbol_code, ".png")
    );
  }, [forecastData.next6h_symbol_code]);

  const borderStyle = () => {
    let css =
      "info-items text-center " +
      colors.text +
      " col-auto border rounded border-";
    let bg = isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return css + bg;
  };

  return (
    <>
      <p className={"mr-1 mb-0 " + colors.text}>
        <small>Forecast</small>
      </p>
      <p className={borderStyle()}>
        <img
          src={forecastImg}
          alt="Forecast"
          width={picWidth}
          height={picWidth}
          className="mr-2 mb-0"
        />
        {forecastData.next6h_temp}°
      </p>
    </>
  );
};

export default Forecast;
