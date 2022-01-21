import * as calc from "../calc";
import { PLOTDIVISOR } from "../calc";

export function drawCanvasBody(
  context,
  canvasData,
  scaledCanvasWidth,
  scaledCanvasHeight,
  selectedBody,
  labelOffset
) {
  const { plotSizeX, angularUnit } = canvasData;
  const { angularDiameterDeg, img } = selectedBody;
  const bodyUnitCount = calc.unit2ang(angularDiameterDeg, angularUnit);

  const canvasUnitCount = plotSizeX / PLOTDIVISOR;
  const offsetWidth = (scaledCanvasWidth / 100) * labelOffset;
  const offsetHeight = (scaledCanvasHeight / 100) * labelOffset;
  const pxPerUnit = (scaledCanvasWidth - offsetWidth) / canvasUnitCount;

  const imagePxDiameter = bodyUnitCount * pxPerUnit;
  const centeringOffset = imagePxDiameter / 2;

  let imgObject = new Image();
  imgObject.src = img;
  context.drawImage(
    imgObject,
    (scaledCanvasWidth + offsetWidth) / 2 - centeringOffset,
    (scaledCanvasHeight - offsetHeight) / 2 - centeringOffset,
    imagePxDiameter,
    imagePxDiameter
  );
}
