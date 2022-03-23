import { PLOTDIVISOR, nrstPointZero, isArcSeconds } from "../../../utils/calc";
import colors from "../../../data/color-data";

function drawSquareGridY(
  ctx,
  plotSizeY,
  offsetWidth,
  dprCanvasWidth,
  dprCanvasHeight,
  pxPerUnitY,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  // paint Y axis grid and numbers
  for (let i = 0; i <= plotSizeY; i++) {
    // include 0 and 20 to make the border
    const x = nrstPointZero(dprCanvasWidth + offsetWidth, dprCanvasWidth);
    const y = nrstPointZero(pxPerUnitY * i, dprCanvasHeight);

    // paint Y grid
    ctx.beginPath();
    if (i === 0 || i === plotSizeY) {
      // border
      ctx.strokeStyle = colors.canvasBorder;
      ctx.moveTo(0 + offsetWidth, y);
      ctx.lineTo(x, y);
    } else if (hasGrid) {
      ctx.strokeStyle = colors.canvasGrid;
      if (hasRedGrid) {
        if ((plotSizeY - i) % redGridFactor === 0) {
          ctx.moveTo(0.5 + offsetWidth, y);
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(0.5 + offsetWidth, y);
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
}

function drawSquareLabels(
  hasLabels,
  ctx,
  labelSize,
  numberSize,
  myFont,
  angularUnit,
  dprCanvasWidth,
  dprCanvasHeight,
  offsetWidth,
  offsetHeight,
  offset
) {
  // paint X and Y axis labels
  if (hasLabels) {
    // X label
    ctx.font = labelSize + "px " + myFont;
    ctx.fillText(
      angularUnit,
      dprCanvasWidth / 2 + offsetWidth,
      dprCanvasHeight - offsetHeight + offset + numberSize + offset
    );

    // Y label
    ctx.save();
    ctx.textBaseline = "bottom";
    ctx.font = labelSize + "px " + myFont;
    ctx.translate(
      offsetWidth - offset - numberSize - offset,
      dprCanvasHeight / 2 - offsetHeight
    );
    ctx.rotate(Math.PI / -2);
    ctx.fillText(angularUnit, 0, 0);
    ctx.restore();
  }
}

function drawSquareGridYnumbers(
  ctx,
  plotSizeY,
  hasLabels,
  numberSize,
  myFont,
  dprCanvasHeight,
  pxPerUnitY,
  offsetHeight,
  offsetWidth,
  offset,
  angularUnit
) {
  // when using arc seconds, we still have 6 spaces between numbers,
  // but unlike arc sec or degrees, the numbers of arc sec count 1 for every empty space
  let divisor = isArcSeconds(angularUnit) ? 1 : PLOTDIVISOR;
  // paint numbers
  for (let i = 0; i <= plotSizeY; i++) {
    if (hasLabels) {
      if (i !== 0 && i % PLOTDIVISOR === 0 && i !== plotSizeY) {
        // draw numbers along Y axis
        ctx.font = numberSize + "px " + myFont;
        ctx.textBaseline = "bottom"; // hmmmm
        ctx.save();
        ctx.translate(
          offsetWidth - offset,
          dprCanvasHeight - pxPerUnitY * i - offsetHeight
        );
        ctx.rotate(Math.PI / -2);
        ctx.fillText(i / divisor, 0, 0);
        ctx.restore();
      }
    }
  }
}

function drawSquareGridXnumbers(
  ctx,
  plotSizeX,
  hasLabels,
  numberSize,
  myFont,
  pxPerUnitX,
  offsetWidth,
  offsetHeight,
  dprCanvasHeight,
  offset,
  angularUnit
) {
  // when using arc seconds, we still have 6 spaces between numbers,
  // but unlike arc sec or degrees, the numbers of arc sec count 1 for every empty space
  let divisor = isArcSeconds(angularUnit) ? 1 : PLOTDIVISOR;
  // paint numbers
  for (let i = 0; i <= plotSizeX; i++) {
    if (hasLabels) {
      if (i !== 0 && i % PLOTDIVISOR === 0 && i !== plotSizeX) {
        // draw numbers along X axis
        ctx.textBaseline = "top";
        ctx.font = numberSize + "px " + myFont;
        ctx.fillText(
          i / divisor,
          pxPerUnitX * i + offsetWidth,
          dprCanvasHeight - offsetHeight + offset // offsett the pixel size chosen above
        );
      }
    }
  }
}

function drawSquareGridX(
  ctx,
  plotSizeX,
  pxPerUnitX,
  offsetWidth,
  offsetHeight,
  dprCanvasWidth,
  dprCanvasHeight,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  for (let i = 0; i <= plotSizeX; i++) {
    //i = 0 and 20 to make the border
    // let { x, y } = nearestPointZero(
    //   pxPerUnitX * i + offsetWidth,
    //   dprCanvasHeight - offsetHeight
    // );

    let x = nrstPointZero(pxPerUnitX * i + offsetWidth, dprCanvasWidth);
    let y = nrstPointZero(dprCanvasHeight - offsetHeight, dprCanvasHeight);

    // paint X grid
    ctx.beginPath();
    if (i === 0 || i === plotSizeX) {
      // the border
      ctx.strokeStyle = colors.canvasBorder;
      ctx.moveTo(x, y);
      ctx.lineTo(x, 0.5);
    } else if (hasGrid) {
      ctx.strokeStyle = colors.canvasGrid;
      if (hasRedGrid) {
        if (i % redGridFactor === 0) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, 0.5);
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, 0.5);
      }
    }
    ctx.stroke();
  }
}

export function drawSquareCanvas(
  ctx,
  canvasData,
  dprCanvasWidth,
  dprCanvasHeight,
  labelSize,
  numberSize,
  labelOffset,
  offset,
  myFont
) {
  const {
    plotSizeX,
    plotSizeY,
    angularUnit,
    hasLabels,
    hasGrid,
    hasRedGrid,
    redGridFactor,
  } = canvasData;
  const offsetHeight = (dprCanvasHeight / 100) * labelOffset;
  const offsetWidth = (dprCanvasWidth / 100) * labelOffset;
  const pxPerUnitX = (dprCanvasWidth - offsetWidth) / plotSizeX;
  const pxPerUnitY = (dprCanvasHeight - offsetHeight) / plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.lineWidth = 1;

  drawSquareGridX(
    ctx,
    plotSizeX,
    pxPerUnitX,
    offsetWidth,
    offsetHeight,
    dprCanvasWidth,
    dprCanvasHeight,
    hasGrid,
    hasRedGrid,
    redGridFactor
  );
  drawSquareGridXnumbers(
    ctx,
    plotSizeX,
    hasLabels,
    numberSize,
    myFont,
    pxPerUnitX,
    offsetWidth,
    offsetHeight,
    dprCanvasHeight,
    offset,
    angularUnit
  );
  drawSquareLabels(
    hasLabels,
    ctx,
    labelSize,
    numberSize,
    myFont,
    angularUnit,
    dprCanvasWidth,
    dprCanvasHeight,
    offsetWidth,
    offsetHeight,
    offset
  );
  drawSquareGridY(
    ctx,
    plotSizeY,
    offsetWidth,
    dprCanvasWidth,
    dprCanvasHeight,
    pxPerUnitY,
    hasGrid,
    hasRedGrid,
    redGridFactor
  );
  drawSquareGridYnumbers(
    ctx,
    plotSizeY,
    hasLabels,
    numberSize,
    myFont,
    dprCanvasHeight,
    pxPerUnitY,
    offsetHeight,
    offsetWidth,
    offset,
    angularUnit
  );
}
