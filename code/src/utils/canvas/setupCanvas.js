//// SETUP THE CANVAS ////

export function getNumberSize(fontSize, canvasContainerWidth, scaledCanvasWidth) {
  let ratio = fontSize / canvasContainerWidth;
  let size = scaledCanvasWidth * ratio;
  return size || 0;
}

export function getLabelSize(labelSize, canvasContainerWidth, scaledCanvasWidth) {
  let ratio = labelSize / canvasContainerWidth;
  let size = scaledCanvasWidth * ratio;
  return size || 0;
}

export function getCanvasHeight(canvasWidth, plotSizeX, plotSizeY) {
  let unitY = plotSizeY;
  let unitX = plotSizeX;
  let pxPerUnitX = canvasWidth / unitX; // pixel to size ratio
  return pxPerUnitX * unitY;
}

export function getDprCanvasDim(dpr, width, height) {
  let dprCanvasWidth = dpr * width;
  let dprCanvasHeight = dpr * height;
  return { dprCanvasWidth, dprCanvasHeight };
}

export function getLabelOffset(
  hasLabels,
  isEyepieceMode,
  dprCanvasWidth,
  dprCanvasHeight,
  DEFAULT_NUMBERSIZE,
  DEFAULT_LABELSIZE,
  OFFSET
) {
  // calculate how much we should shrink the canvas in order to
  // fit the DEFAULT_LABELSIZE and DEFAULT_NUMBERSIZE nicely on the outside.
  // we base the calculation on whichever axis has the least pixels.
  let labelOffset = 0;
  if (!isEyepieceMode && hasLabels && dprCanvasWidth && dprCanvasHeight) {
    let smllstSide = dprCanvasHeight < dprCanvasWidth ? dprCanvasHeight : dprCanvasWidth;
    // then we find how many % the the font and labels are of the axis with the least pixels.
    let spaceRequired = DEFAULT_LABELSIZE + DEFAULT_NUMBERSIZE + OFFSET * 2;
    // then we set the labelOffset as that percentage.
    labelOffset = (spaceRequired / smllstSide) * 100;
  }
  return labelOffset;
}

// export function getDPRwithZoom(zoomValue) {
//   let dpr = window.devicePixelRatio || 1;
//   let zoomValueFlipped = 100 - zoomValue;
//   let valueToAdd = (dpr / 100) * zoomValueFlipped;
//   dpr += valueToAdd;
//   return dpr;
// }
