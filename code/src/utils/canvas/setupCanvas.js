//// SETUP THE CANVAS ////
export function getDPRwithZoom(zoomValue) {
  let dpr = window.devicePixelRatio || 1;
  let zoomValueFlipped = 100 - zoomValue;
  let valueToAdd = (dpr / 100) * zoomValueFlipped;
  dpr += valueToAdd;
  return dpr;
}

export function getCanvasHeight(canvasWidth, canvasData) {
  let { plotSizeX, plotSizeY } = canvasData;
  let unitY = plotSizeY;
  let unitX = plotSizeX;
  let pxPerUnitX = canvasWidth / unitX; // pixel to size ratio
  return pxPerUnitX * unitY;
}

export function getScaledCanvasDim(dpr, width, height) {
  let scaledCanvasWidth = dpr * width;
  let scaledCanvasHeight = dpr * height;
  return { scaledCanvasWidth, scaledCanvasHeight };
}

export function getSizeOffsetForLabels(
  hasLabels,
  isEyepieceMode,
  scaledCanvasWidth,
  scaledCanvasHeight,
  numberFont,
  labelFont,
  offset
) {
  // calculate how much we should shrink the canvas in order to
  // fit the labelFont and numberFont nicely on the outside.
  // we base the calculation on whichever axis has the least pixels.
  let labelOffset = 0;
  if (!isEyepieceMode && hasLabels && scaledCanvasWidth && scaledCanvasHeight) {
    let smllstSide =
      scaledCanvasHeight < scaledCanvasWidth
        ? scaledCanvasHeight
        : scaledCanvasWidth;
    // then we find how many % the the font and labels are of the axis with the least pixels.
    let spaceRequired =
      Number(labelFont.slice(0, 2)) +
      Number(numberFont.slice(0, 2)) +
      offset * 2;
    // then we set the labelOffset as that percentage.
    labelOffset = (spaceRequired / smllstSide) * 100;
  }
  return labelOffset;
}
