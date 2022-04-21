import React, { useEffect, useState } from "react";
import { getColors } from "../../store/slices/colorSlice";
import { useSelector } from "react-redux";
import { getError, getLoading } from "../../store/slices/canvasSlice";
import Grid from "./Grid";
import ReducedGridlines from "./ReducedGridlines";
import Labels from "./Labels";
import Zoom from "./Zoom";

const CanvasOptions = () => {
  const colors = useSelector(getColors);
  const canvasIsLoading = useSelector(getLoading);
  const canvasIsError = useSelector(getError);

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted || canvasIsLoading) return <></>;

  if (isMounted && canvasIsError) return <></>;

  if (isMounted) {
    return (
      <div
        className={"border border-white rounded mb-1 bg-" + colors.background}
      >
        <div className={"d-flex justify-content-around " + colors.text}>
          <Grid />
          <ReducedGridlines />
          <Labels />
          <Zoom />
        </div>
      </div>
    );
  }
};

export default CanvasOptions;
