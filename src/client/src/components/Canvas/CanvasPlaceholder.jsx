import React from "react";
import { getImgPath } from "../../utils/calc";
import { getLoading, getError } from "../../store/slices/canvasSlice.js";
import { useSelector } from "react-redux";
import Canvas from "./Canvas";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");

const CanvasPlaceholder = () => {
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);

  if (isError) {
    return (
      <div className="container d-flex justify-content-center p-0">
        <img src={errorImg} alt="ERROR..." />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-center p-0">
        <img src={loadingImg} alt="LOADING..." />
      </div>
    );
  }

  return <Canvas />;
};

export default CanvasPlaceholder;
