import React, { memo } from "react";
import Grid from "./Grid";
import ReducedGridlines from "./ReducedGridlines";
import Labels from "./Labels";
import Zoom from "./Zoom";
import colors from "../../data/color-data";

const CanvasOptions = () => (
  <div className={"border border-white rounded mb-1 bg-" + colors.background}>
    <div className={"d-flex justify-content-around " + colors.text}>
      <Grid />
      <ReducedGridlines />
      <Labels />
      <Zoom />
    </div>
  </div>
);

export default memo(CanvasOptions);
