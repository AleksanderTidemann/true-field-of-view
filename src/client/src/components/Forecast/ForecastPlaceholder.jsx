import React from "react";
import { getImgPath } from "../../utils/calc";
import { useSelector } from "react-redux";
import Forecast from "./Forecast";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");

const ForecastPlaceholder = () => {
  return <Forecast />;
};

export default ForecastPlaceholder;
