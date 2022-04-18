import React, { useEffect, useState } from "react";
import { getImgPath } from "../../utils/calc";
import {
  getLatLong,
  getAreaCountry,
  getData,
  filterData,
} from "./utils/forecastUtils";
import { useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { getMode } from "../../store/slices/canvasSlice";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");
const picWidth = "25px";

const Forecast = () => {
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const isEyepieceMode = useSelector(getMode);
  const colors = useSelector(getColors);

  // Componemt did mount
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const fetchData = async () => {
      try {
        const { lat, long } = await getLatLong();
        const { area, country } = await getAreaCountry(lat, long);
        const data = await getData(lat, long);
        const { forecast, forecastTime, forecastDate } = filterData(
          data.properties.timeseries
        );
        const symbol_code = forecast.data.next_6_hours.summary.symbol_code;
        const temperature = forecast.data.instant.details.air_temperature;

        // replace with getImgPath function
        const forecastImg = getImgPath("weather", symbol_code, ".png");

        setForecastData({
          next6h_img: forecastImg,
          next6h_temp: temperature,
          area: area,
          country: country,
          current_date: forecastDate,
          current_time: forecastTime,
        });
        setIsLoading(false);
      } catch (error) {
        alert("Error in mounting Forecast component:", error.message);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const borderStyle = () => {
    let css =
      "info-items text-center " +
      colors.text +
      " col-auto border rounded border-";
    let bg = isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return css + bg;
  };

  return (
    <div className="form-label-group mb-0 mt-2 justify-content-center">
      <p className={"mr-1 " + colors.text}>
        <small>Forecast</small>
      </p>
      <p className={borderStyle()}>
        {isError ? (
          <img
            src={errorImg}
            alt="ERROR..."
            width={picWidth}
            height={picWidth}
          />
        ) : isLoading ? (
          <img
            src={loadingImg}
            alt="loading..."
            width={picWidth}
            height={picWidth}
          />
        ) : (
          <>
            <img
              src={forecastData.next6h_img}
              alt="Specification Drawing"
              width={picWidth}
              height={picWidth}
              className="mr-2"
            />
            {forecastData.next6h_temp}°
          </>
        )}
      </p>
    </div>
  );
};

export default Forecast;
