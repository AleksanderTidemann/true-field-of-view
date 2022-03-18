import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import * as setup from "../../utils/canvas/setupCanvas.js";
import { drawCircleCanvas } from "../../utils/canvas/drawCircleCanvas.js";
import { drawCanvasBg } from "../../utils/canvas/drawCanvasBg.js";
import { drawSquareCanvas } from "../../utils/canvas/drawSquareCanvas.js";
import { drawCanvasBody } from "../../utils/canvas/drawCanvasBody.js";
import { isEmptyObject } from "../../utils/calc";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// maybe move into a canvas config file?
const DEFAULT_FONT = "Arial";
const DEFAULT_LABELSIZE = 60;
const DEFAULT_NUMBERSIZE = 40;
const DEFAULT_OFFSET = 5;

const Canvas = ({ globalCanvasData, currBody }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [dprCanvasWidth, setDprCanvasWidth] = useState(null);
  const [dprCanvasHeight, setDprCanvasHeight] = useState(null);

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
      const newCanvasWidth =
        (containerWidth / 100) * globalCanvasData.zoomValue;
      const newCanvasHeight = setup.getCanvasHeight(
        newCanvasWidth,
        globalCanvasData.plotSizeX,
        globalCanvasData.plotSizeY
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
    globalCanvasData.zoomValue,
    globalCanvasData.plotSizeX,
    globalCanvasData.plotSizeY,
  ]);

  // If the canvasWidth and sizes change,
  // set a new labelOffset
  useEffect(() => {
    setLabelOffset(
      setup.getLabelOffset(
        globalCanvasData.hasLabels,
        globalCanvasData.isEyepieceMode,
        dprCanvasWidth,
        dprCanvasHeight,
        numberSize,
        labelSize,
        DEFAULT_OFFSET
      )
    );
  }, [
    globalCanvasData.hasLabels,
    globalCanvasData.isEyepieceMode,
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

      if (!globalCanvasData.isEyepieceMode) {
        drawSquareCanvas(
          context,
          globalCanvasData,
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
          globalCanvasData,
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
        globalCanvasData.plotSizeX,
        globalCanvasData.angularUnit,
        dprCanvasWidth,
        dprCanvasHeight,
        currBody,
        labelOffset
      );
    }
  });

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
              globalCanvasData.isEyepieceMode
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
  globalCanvasData: PropTypes.object.isRequired,
  currBody: PropTypes.object.isRequired,
};

export default Canvas;
