import { nrstPointZero } from "../calc";

function drawCircleGridY(
  ctx,
  plotSizeY,
  hasGrid,
  hasRedGrid,
  redGridFactor,
  scaledCanvasWidth,
  scaledCanvasHeight,
  pxPerUnitY
) {
  // paint Y axis grid and numbers
  for (let i = 0; i <= plotSizeY; i++) {
    // include 0 and 20 to make the border
    let x = nrstPointZero(0.5, scaledCanvasWidth);
    let y = nrstPointZero(pxPerUnitY * i, scaledCanvasHeight);

    // paint grid
    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if ((i - plotSizeY) % redGridFactor === 0) {
          ctx.moveTo(x, y);
          ctx.lineTo(scaledCanvasWidth, y);
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(scaledCanvasWidth, y);
      }
      ctx.stroke();
    }
  }
}

function paintCircularText(
  label,
  ctx,
  angle,
  labelFont,
  scaledCanvasWidth,
  scaledCanvasHeight
) {
  let startAngle = angle;
  let clockwise = -1;
  let textHeight = Number(labelFont.slice(0, 2));
  ctx.translate(scaledCanvasWidth / 2, scaledCanvasHeight / 2);
  ctx.textBaseline = "middle";
  ctx.font = labelFont;

  // rotate 50% of total angle for center alignment
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width;
    startAngle +=
      (charWid / (scaledCanvasWidth / 2 - textHeight) / 2) * -clockwise;
  }

  ctx.rotate(startAngle);

  // Now for the fun bit: draw, rotate, and repeat
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width; // half letter
    // rotate half letter
    ctx.rotate(
      (charWid / 2 / (scaledCanvasWidth / 2 - textHeight)) * clockwise
    );
    // draw the character at "top" or "bottom"
    // depending on inward or outward facing
    ctx.fillText(
      label[j],
      0,
      -1 * (0 - scaledCanvasWidth / 2 + textHeight / 2)
    );

    ctx.rotate(
      (charWid / 2 / (scaledCanvasWidth / 2 - textHeight)) * clockwise
    ); // rotate half letter
  }
}

function drawCircleLabels(
  ctx,
  hasLabels,
  labelFont,
  angularUnit,
  scaledCanvasWidth,
  scaledCanvasHeight
) {
  // paint X and Y axis labels
  if (hasLabels) {
    // X labels
    ctx.save();
    paintCircularText(
      angularUnit,
      ctx,
      45,
      labelFont,
      scaledCanvasWidth,
      scaledCanvasHeight
    );
    ctx.restore();
  }
}

function drawCircleGridX(
  ctx,
  plotSizeX,
  pxPerUnitX,
  scaledCanvasWidth,
  scaledCanvasHeight,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  // paint X axis grid and numbers
  for (let i = 0; i <= plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let x = nrstPointZero(pxPerUnitX * i, scaledCanvasWidth);
    let y = nrstPointZero(0.5, scaledCanvasHeight);

    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if (i % redGridFactor === 0) {
          ctx.moveTo(x, scaledCanvasHeight);
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(x, scaledCanvasHeight);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
}

function drawCircleGridNumbers(
  ctx,
  plotSizeX,
  hasLabels,
  plotDivisor,
  hasRedGrid,
  scaledCanvasHeight,
  pxPerUnitX,
  pxPerUnitY,
  redGridFactor,
  numberFont,
  offset
) {
  for (let i = 0; i <= plotSizeX; i++) {
    // paint numbers
    if (hasLabels) {
      if (i !== 0 && i % plotDivisor === 0 && i !== plotSizeX) {
        // draw numbers along axis
        let textHeight = hasRedGrid
          ? scaledCanvasHeight - pxPerUnitY * redGridFactor
          : scaledCanvasHeight / 2;

        ctx.font = numberFont;
        ctx.textBaseline = "top";
        ctx.fillText(
          i / plotDivisor,
          pxPerUnitX * i + offset * 2,
          textHeight + offset // offsett the pixel size chosen above
        );
      }
    }
  }
}

export function drawCircleCanvas(
  ctx,
  canvasData,
  colors,
  scaledCanvasWidth,
  scaledCanvasHeight,
  labelFont,
  numberFont,
  offset
) {
  const {
    plotSizeX,
    plotSizeY,
    plotDivisor,
    angularUnit,
    hasLabels,
    hasGrid,
    hasRedGrid,
    redGridFactor,
  } = canvasData;
  const pxPerUnitX = scaledCanvasWidth / plotSizeX;
  const pxPerUnitY = scaledCanvasHeight / plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.strokeStyle = colors.canvasGrid;
  ctx.lineWidth = 1;

  drawCircleGridX(
    ctx,
    plotSizeX,
    pxPerUnitX,
    scaledCanvasWidth,
    scaledCanvasHeight,
    hasGrid,
    hasRedGrid,
    redGridFactor
  );
  drawCircleGridNumbers(
    ctx,
    plotSizeX,
    hasLabels,
    plotDivisor,
    hasRedGrid,
    scaledCanvasHeight,
    pxPerUnitX,
    pxPerUnitY,
    redGridFactor,
    numberFont,
    offset
  );
  drawCircleLabels(
    ctx,
    hasLabels,
    labelFont,
    angularUnit,
    scaledCanvasWidth,
    scaledCanvasHeight
  );
  drawCircleGridY(
    ctx,
    plotSizeY,
    hasGrid,
    hasRedGrid,
    redGridFactor,
    scaledCanvasWidth,
    scaledCanvasHeight,
    pxPerUnitY
  );
}
