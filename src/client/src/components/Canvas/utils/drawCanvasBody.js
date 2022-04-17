import * as calc from "../../../utils/calc";

export function drawCanvasBody(
  context,
  plotSizeX,
  angularUnit,
  dprCanvasWidth,
  dprCanvasHeight,
  selectedBody,
  selectedCrowdName,
  labelOffset
) {
  const { angularDiameterDeg, key } = selectedBody;
  const imgPath = calc.getImgPath(selectedCrowdName, key, ".png");

  const bodyUnitCount = calc.unit2ang(angularDiameterDeg, angularUnit);

  const canvasUnitCount = plotSizeX / calc.PLOTDIVISOR;

  const offsetWidth = (dprCanvasWidth / 100) * labelOffset;
  const offsetHeight = (dprCanvasHeight / 100) * labelOffset;
  const pxPerUnit = (dprCanvasWidth - offsetWidth) / canvasUnitCount;

  const imagePxDiameter = bodyUnitCount * pxPerUnit;
  const centeringOffset = imagePxDiameter / 2;

  let imgObject = new Image();
  imgObject.src = imgPath;
  context.drawImage(
    imgObject,
    (dprCanvasWidth + offsetWidth) / 2 - centeringOffset,
    (dprCanvasHeight - offsetHeight) / 2 - centeringOffset,
    imagePxDiameter,
    imagePxDiameter
  );
}
