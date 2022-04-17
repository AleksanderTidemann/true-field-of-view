import React from "react";
import BodySelector from "../BodySelector/BodySelector";
import CrowdSelector from "../CrowdSelector/CrowdSelector";
import { getImgPath } from "../../utils/calc";
import { useSelector } from "react-redux";
import { getLoading, getError } from "../../store/slices/crowdsSlice";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");
const picWidth = "35px";

const Selector = () => {
  const isError = useSelector(getError);
  const isLoading = useSelector(getLoading);

  if (isError) {
    return (
      <div className="container d-flex justify-content-around p-0 mb-4">
        <img src={errorImg} alt="ERROR..." width={picWidth} height={picWidth} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-around p-0 mb-4">
        <img
          src={loadingImg}
          alt="LOADING..."
          width={picWidth}
          height={picWidth}
        />
      </div>
    );
  }

  return (
    <div className="container p-0 mb-4">
      <div className="row">
        <CrowdSelector />
        <BodySelector picWidth={picWidth} />
      </div>
    </div>
  );
};

// because globalCanvasData does not have to update the Selector
export default Selector;
