import React, { useEffect, useState } from "react";
import { DIVIMAGES } from "../../data/img-data";
import {
  getLatLong,
  getAreaCountry,
  getData,
  filterData,
} from "../../utils/requests/getForecast";
import PropTypes from "prop-types";

const loading = DIVIMAGES.loading;
const error = DIVIMAGES.error;

const Forecast = ({ isEyepieceMode, colors }) => {
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

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
        const wimg = require("../../img/weather/" +
          symbol_code +
          ".png").default;

        setForecastData({
          next6h_img: wimg,
          next6h_temp: temperature,
          area: area,
          country: country,
          current_date: forecastDate,
          current_time: forecastTime,
        });
        setIsLoading(false);
      } catch (error) {
        alert(error);
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
    <div className="form-label-group mb-0 mt-2" key="forecast">
      <p className={"mr-1 " + colors.text}>
        <small>Forecast</small>
      </p>
      {isError ? (
        <p className={borderStyle()}>
          <img src={error} alt="ERROR..." width="25px" height="25px" />
        </p>
      ) : isLoading ? (
        <p className={borderStyle()}>
          <img src={loading} alt="loading..." width="25px" height="25px" />
        </p>
      ) : (
        <p className={borderStyle()}>
          <img
            src={forecastData.next6h_img}
            alt="Specification Drawing"
            width="25px"
            height="25px"
            className="mr-2"
          />
          {forecastData.next6h_temp}°
        </p>
      )}
    </div>
  );
};

Forecast.propTypes = {
  isEyepieceMode: PropTypes.bool.isRequired,
  colors: PropTypes.object.isRequired,
};

export default Forecast;
