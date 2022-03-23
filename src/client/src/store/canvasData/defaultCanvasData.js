import { ANGULAR_MEASUREMENT_LABELS } from "../../utils/calc";

const DEFAULT_CANVAS_DATA = {
  isEyepieceMode: true,
  hasGrid: true,
  hasLabels: true,
  hasRedGrid: false,
  redGridFactor: 6,
  zoomValue: 50,
  zoomIncrement: 10,
  plotSizeX: 20,
  plotSizeY: 20,
  angularUnit: ANGULAR_MEASUREMENT_LABELS[1],
};

export default DEFAULT_CANVAS_DATA;
