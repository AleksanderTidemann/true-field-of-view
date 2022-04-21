import React, { useCallback, useEffect, useState } from "react";
import { getImgPath } from "../../utils/calc";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoading,
  getError,
  loadForecast,
  getForecastData,
} from "../../store/slices/forecastSlice";
import Forecast from "./Forecast";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");
const picWidth = "25px";

const ForecastPlaceholder = ({ userCoords }) => {
  const dispatch = useDispatch();
  const forecastData = useSelector(getForecastData);
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);

  const [mounted, setMounted] = useState(false);

  // we only fetch forecast data from server on mount
  // AND IF the userLat and userLong changes.
  const fetchForecast = useCallback(() => {
    dispatch(loadForecast(userCoords));
  }, [dispatch, userCoords]);

  useEffect(() => {
    fetchForecast();
    setMounted(true);
  }, [fetchForecast]);

  if (!mounted || isLoading) {
    return (
      <img src={loadingImg} alt="loading" width={picWidth} height={picWidth} />
    );
  }

  if (mounted && isError) {
    return (
      <img src={errorImg} alt="error" width={picWidth} height={picWidth} />
    );
  }
  if (mounted) {
    return <Forecast picWidth={picWidth} forecastData={forecastData} />;
  }
};

export default ForecastPlaceholder;
