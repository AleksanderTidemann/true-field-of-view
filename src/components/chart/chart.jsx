import React, { useEffect, useState, useCallback } from "react";
import Canvas from "../Canvas/Canvas";
import Selector from "../Selector/Selector";
import CanvasOptions from "../CanvasOptions/CanvasOptions";
import PropTypes from "prop-types";

const Chart = ({ globalCanvasData, setGlobalCanvasData }) => {
  const [currBody, setCurrBody] = useState({});

  // reset currBody when modeswitching
  useEffect(() => {
    setCurrBody({});
  }, [globalCanvasData.isEyepieceMode]);

  return (
    <div className="container p-0">
      <CanvasOptions
        globalCanvasData={globalCanvasData}
        setGlobalCanvasData={setGlobalCanvasData}
      />
      <Selector
        isEyepieceMode={globalCanvasData.isEyepieceMode}
        currBody={currBody}
        setCurrBody={setCurrBody}
      />
      <Canvas globalCanvasData={globalCanvasData} currBody={currBody} />
    </div>
  );
};

Chart.propTypes = {
  globalCanvasData: PropTypes.object.isRequired,
  setGlobalCanvasData: PropTypes.func.isRequired,
};

export default Chart;
