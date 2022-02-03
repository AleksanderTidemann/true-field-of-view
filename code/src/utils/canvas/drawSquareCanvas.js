import { nrstPointZero, isArcSeconds } from "../calc";
import colors from "../../data/color-data";
import { PLOTDIVISOR } from "../calc";

function drawSquareGridY(
  ctx,
  plotSizeY,
  offsetWidth,
  scaledCanvasWidth,
  scaledCanvasHeight,
  pxPerUnitY,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  // paint Y axis grid and numbers
  for (let i = 0; i <= plotSizeY; i++) {
    // include 0 and 20 to make the border
    const x = nrstPointZero(scaledCanvasWidth + offsetWidth, scaledCanvasWidth);
    const y = nrstPointZero(pxPerUnitY * i, scaledCanvasHeight);

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
  labelFont,
  numberFont,
  angularUnit,
  scaledCanvasWidth,
  scaledCanvasHeight,
  offsetWidth,
  offsetHeight,
  offset
) {
  // paint X and Y axis labels
  if (hasLabels) {
    // X label
    ctx.font = labelFont;
    ctx.fillText(
      angularUnit,
      scaledCanvasWidth / 2 + offsetWidth,
      scaledCanvasHeight - offsetHeight + offset + Number(numberFont.slice(0, 2)) + offset
    );

    // Y label
    ctx.save();
    ctx.textBaseline = "bottom";
    ctx.font = labelFont;
    ctx.translate(
      offsetWidth - offset - Number(numberFont.slice(0, 2)) - offset,
      scaledCanvasHeight / 2 - offsetHeight
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
  numberFont,
  scaledCanvasHeight,
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
        ctx.font = numberFont;
        ctx.textBaseline = "bottom"; // hmmmm
        ctx.save();
        ctx.translate(
          offsetWidth - offset,
          scaledCanvasHeight - pxPerUnitY * i - offsetHeight
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
  numberFont,
  pxPerUnitX,
  offsetWidth,
  offsetHeight,
  scaledCanvasHeight,
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
        ctx.font = numberFont;
        ctx.fillText(
          i / divisor,
          pxPerUnitX * i + offsetWidth,
          scaledCanvasHeight - offsetHeight + offset // offsett the pixel size chosen above
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
  scaledCanvasWidth,
  scaledCanvasHeight,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  for (let i = 0; i <= plotSizeX; i++) {
    //i = 0 and 20 to make the border
    // let { x, y } = nearestPointZero(
    //   pxPerUnitX * i + offsetWidth,
    //   scaledCanvasHeight - offsetHeight
    // );

    let x = nrstPointZero(pxPerUnitX * i + offsetWidth, scaledCanvasWidth);
    let y = nrstPointZero(scaledCanvasHeight - offsetHeight, scaledCanvasHeight);

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
  scaledCanvasWidth,
  scaledCanvasHeight,
  labelFont,
  numberFont,
  labelOffset,
  offset
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
  const offsetHeight = (scaledCanvasHeight / 100) * labelOffset;
  const offsetWidth = (scaledCanvasWidth / 100) * labelOffset;
  const pxPerUnitX = (scaledCanvasWidth - offsetWidth) / plotSizeX;
  const pxPerUnitY = (scaledCanvasHeight - offsetHeight) / plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.lineWidth = 1;

  drawSquareGridX(
    ctx,
    plotSizeX,
    pxPerUnitX,
    offsetWidth,
    offsetHeight,
    scaledCanvasWidth,
    scaledCanvasHeight,
    hasGrid,
    hasRedGrid,
    redGridFactor
  );
  drawSquareGridXnumbers(
    ctx,
    plotSizeX,
    hasLabels,
    numberFont,
    pxPerUnitX,
    offsetWidth,
    offsetHeight,
    scaledCanvasHeight,
    offset,
    angularUnit
  );
  drawSquareLabels(
    hasLabels,
    ctx,
    labelFont,
    numberFont,
    angularUnit,
    scaledCanvasWidth,
    scaledCanvasHeight,
    offsetWidth,
    offsetHeight,
    offset
  );
  drawSquareGridY(
    ctx,
    plotSizeY,
    offsetWidth,
    scaledCanvasWidth,
    scaledCanvasHeight,
    pxPerUnitY,
    hasGrid,
    hasRedGrid,
    redGridFactor
  );
  drawSquareGridYnumbers(
    ctx,
    plotSizeY,
    hasLabels,
    numberFont,
    scaledCanvasHeight,
    pxPerUnitY,
    offsetHeight,
    offsetWidth,
    offset,
    angularUnit
  );
}
