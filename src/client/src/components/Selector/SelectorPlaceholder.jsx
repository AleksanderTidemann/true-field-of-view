import React, { useState, useEffect } from "react";
import BodySelector from "./BodySelector";
import CrowdSelector from "./CrowdSelector";
import { getImgPath } from "../../utils/calc";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoading,
  getError,
  loadCrowdData,
} from "../../store/slices/crowdsSlice";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");
const picWidth = "35px";

const SelectorPlaceholder = () => {
  const dispatch = useDispatch();
  const isError = useSelector(getError);
  const isLoading = useSelector(getLoading);

  const [isMounted, setMounted] = useState(false);

  // on mount, get the default crowd data from the server.
  useEffect(() => {
    dispatch(loadCrowdData());
    setMounted(true);
  }, [dispatch]);

  if (!isMounted || isLoading) {
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

  if (isMounted && isError) {
    return (
      <div className="container d-flex justify-content-around p-0 mb-4">
        <img src={errorImg} alt="ERROR..." width={picWidth} height={picWidth} />
      </div>
    );
  }

  if (isMounted) {
    return (
      <div className="container p-0 mb-4">
        <div className="row">
          <CrowdSelector />
          <BodySelector picWidth={picWidth} />
        </div>
      </div>
    );
  }
};

export default SelectorPlaceholder;
