import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  memo,
} from "react";
import * as setup from "./utils/setupCanvas.js";
import { drawCircleCanvas } from "./utils/drawCircleCanvas.js";
import { drawCanvasBg } from "./utils/drawCanvasBg.js";
import { drawSquareCanvas } from "./utils/drawSquareCanvas.js";
import { drawCanvasBody } from "./utils/drawCanvasBody.js";
import { isEmptyObject } from "../../utils/calc";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { getCanvasData } from "../../store/canvasData/canvasData.js";

const DEFAULT_FONT = "Arial";
const DEFAULT_LABELSIZE = 60;
const DEFAULT_NUMBERSIZE = 40;
const DEFAULT_OFFSET = 5;

const Canvas = ({ currBody }) => {
  const canvasData = useSelector(getCanvasData);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [dprCanvasWidth, setDprCanvasWidth] = useState(null);
  const [dprCanvasHeight, setDprCanvasHeight] = useState(null);

  // these are updated according to the size of the canvas
  const [numberSize, setNumberSize] = useState(null);
  const [labelSize, setLabelSize] = useState(null);
  const [labelOffset, setLabelOffset] = useState(null);

  const [forceUpdate, setForceUpdate] = useState(null);

  // on mount, listen and forceUpdate on the window resizing.
  useEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", setForceUpdate);
      return () => {
        window.removeEventListener("resize", setForceUpdate);
      };
    }
  }, [canvasRef]);

  // If the parent DIV mounts, and whenever we resize the window,
  // Set a new containerWidth.
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.parentNode.clientWidth);
    }
  }, [containerRef, forceUpdate]);

  // If the container width changes or a new zoom value is registered,
  // set a new canvasWidth and Height
  useEffect(() => {
    if (containerWidth) {
      const newCanvasWidth = (containerWidth / 100) * canvasData.zoomValue;
      const newCanvasHeight = setup.getCanvasHeight(
        newCanvasWidth,
        canvasData.plotSizeX,
        canvasData.plotSizeY
      );
      const dpr = window.devicePixelRatio || 1;
      const { dprCanvasWidth, dprCanvasHeight } = setup.getDprCanvasDim(
        dpr,
        newCanvasWidth,
        newCanvasHeight
      );

      setNumberSize(
        setup.getNumberSize(DEFAULT_NUMBERSIZE, containerWidth, dprCanvasWidth)
      );
      setLabelSize(
        setup.getLabelSize(DEFAULT_LABELSIZE, containerWidth, dprCanvasWidth)
      );
      setCanvasWidth(newCanvasWidth);
      setDprCanvasWidth(dprCanvasWidth);
      setDprCanvasHeight(dprCanvasHeight);
    }
  }, [
    containerWidth,
    canvasData.zoomValue,
    canvasData.plotSizeX,
    canvasData.plotSizeY,
  ]);

  // If the canvasWidth and sizes change,
  // set a new labelOffset
  useEffect(() => {
    setLabelOffset(
      setup.getLabelOffset(
        canvasData.hasLabels,
        canvasData.isEyepieceMode,
        dprCanvasWidth,
        dprCanvasHeight,
        numberSize,
        labelSize,
        DEFAULT_OFFSET
      )
    );
  }, [
    canvasData.hasLabels,
    canvasData.isEyepieceMode,
    dprCanvasWidth,
    dprCanvasHeight,
    numberSize,
    labelSize,
  ]);

  // Paint the canvas
  useLayoutEffect(() => {
    if (canvasRef.current && canvasWidth) {
      //setup canvas
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = dprCanvasWidth;
      canvas.height = dprCanvasHeight;
      // context.scale(dpr, dpr);

      drawCanvasBg(context, dprCanvasWidth, dprCanvasHeight);

      if (!canvasData.isEyepieceMode) {
        drawSquareCanvas(
          context,
          canvasData,
          dprCanvasWidth,
          dprCanvasHeight,
          labelSize,
          numberSize,
          labelOffset,
          DEFAULT_OFFSET,
          DEFAULT_FONT
        );
      } else {
        drawCircleCanvas(
          context,
          canvasData,
          dprCanvasWidth,
          dprCanvasHeight,
          labelSize,
          numberSize,
          DEFAULT_OFFSET,
          DEFAULT_FONT
        );
      }

      // finally,
      if (isEmptyObject(currBody)) return;
      drawCanvasBody(
        context,
        canvasData.plotSizeX,
        canvasData.angularUnit,
        dprCanvasWidth,
        dprCanvasHeight,
        currBody,
        labelOffset
      );
    }
  });

  return (
    <motion.div
      key={canvasData.isEyepieceMode ? "ep" : "cam"}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
    >
      <div className="container d-flex justify-content-center p-0">
        <div ref={containerRef} style={{ width: canvasWidth }}>
          <canvas
            ref={canvasRef}
            className={
              canvasData.isEyepieceMode
                ? "w-100 border rounded-circle"
                : "w-100"
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

Canvas.propTypes = {
  currBody: PropTypes.object.isRequired,
};

export default memo(Canvas);
