import React, { useEffect, useState } from "react";
import { getImgPath } from "../../utils/calc";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCanvasData,
  getLoading,
  getError,
} from "../../store/slices/canvasSlice.js";
import Canvas from "./Canvas";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");

const CanvasPlaceholder = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);

  const [isMounted, setMounted] = useState(false);

  // on mount, get the default canvas data from the server.
  useEffect(() => {
    dispatch(loadCanvasData());
    setMounted(true);
  }, [dispatch]);

  if (!isMounted || isLoading) {
    return (
      <div className="container d-flex justify-content-center p-0">
        <img src={loadingImg} alt="LOADING..." />
      </div>
    );
  }

  if (isMounted && isError) {
    return (
      <div className="container d-flex justify-content-center p-0">
        <img src={errorImg} alt="ERROR..." />
      </div>
    );
  }
  if (isMounted) {
    return <Canvas />;
  }
};

export default CanvasPlaceholder;
