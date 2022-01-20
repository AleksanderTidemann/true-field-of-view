import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  memo,
} from "react";
import {
  getDPRwithZoom,
  getCanvasHeight,
  getScaledCanvasDim,
  getSizeOffsetForLabels,
} from "../../../utils/canvas/setupCanvas.js";
import { drawCircleCanvas } from "../../../utils/canvas/drawCircleCanvas.js";
import { drawCanvasBg } from "../../../utils/canvas/drawCanvasBg.js";
import { drawSquareCanvas } from "../../../utils/canvas/drawSquareCanvas.js";
import { drawCanvasBody } from "../../../utils/canvas/drawCanvasBody.js";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const LABELFONT = "40px Arial";
const NUMBERFONT = "20px Arial";
const OFFSET = 5;

// layouteffect runs before the DOM initally renders.
// A good place to update/get size of DOM elements to avoid flickering.
const Canvas = ({ globalCanvasData, currBody }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [forceUpdate, setForceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // on mount, listen and forceUpdate on the window resizing.
    if (canvasRef.current) {
      window.addEventListener("resize", setForceUpdate);
      return () => {
        window.removeEventListener("resize", setForceUpdate);
      };
    }
  }, [canvasRef]);

  useLayoutEffect(() => {
    // Set the containerWidth when the parent DIV mounts,
    // and whenever we resize the window.
    if (containerRef.current) {
      setContainerWidth(containerRef.current.parentNode.clientWidth);
    }
  }, [containerRef, forceUpdate]);

  useLayoutEffect(() => {
    // Set the canvasWidth If the container width
    //OR a new zoom value is registered.
    if (containerWidth) {
      let cw = (containerWidth / 100) * globalCanvasData.zoomValue;
      setCanvasWidth(cw);
    }
  }, [containerWidth, globalCanvasData.zoomValue]);

  // Paint the canvas
  useLayoutEffect(() => {
    if (canvasRef.current && canvasWidth) {
      //setup canvas
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const dpr = getDPRwithZoom(globalCanvasData.zoomValue);
      const canvasHeight = getCanvasHeight(canvasWidth, globalCanvasData);
      const { scaledCanvasWidth, scaledCanvasHeight } = getScaledCanvasDim(
        dpr,
        canvasWidth,
        canvasHeight
      );
      const LABELOFFSET = getSizeOffsetForLabels(
        globalCanvasData.hasLabels,
        globalCanvasData.isEyepieceMode,
        scaledCanvasWidth,
        scaledCanvasHeight,
        NUMBERFONT,
        LABELFONT,
        OFFSET
      );

      canvas.width = scaledCanvasWidth;
      canvas.height = scaledCanvasHeight;
      // context.scale(dpr, dpr);

      drawCanvasBg(context, scaledCanvasWidth, scaledCanvasHeight);

      if (!globalCanvasData.isEyepieceMode) {
        drawSquareCanvas(
          context,
          globalCanvasData,
          scaledCanvasWidth,
          scaledCanvasHeight,
          LABELFONT,
          NUMBERFONT,
          LABELOFFSET,
          OFFSET
        );
      } else {
        drawCircleCanvas(
          context,
          globalCanvasData,
          scaledCanvasWidth,
          scaledCanvasHeight,
          LABELFONT,
          NUMBERFONT,
          OFFSET
        );
      }

      // finally,
      if (currBody) {
        drawCanvasBody(
          context,
          globalCanvasData,
          scaledCanvasWidth,
          scaledCanvasHeight,
          currBody,
          LABELOFFSET
        );
      }

      // canvas.style.width = canvasWidth + "px !important";
      // canvas.style.height = canvasWidth + "px !important";
    }
  }, [canvasRef, canvasWidth, globalCanvasData, currBody]);

  return (
    <motion.div
      key={globalCanvasData.isEyepieceMode ? "ep" : "cam"}
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
              globalCanvasData.isEyepieceMode ? "w-100 border rounded-circle" : "w-100"
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

Canvas.propTypes = {
  globalCanvasData: PropTypes.object.isRequired,
  //   currBody: PropTypes.object.isRequired, can be both object and null :/
};

export default Canvas;
