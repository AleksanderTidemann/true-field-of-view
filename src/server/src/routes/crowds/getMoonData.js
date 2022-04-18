import { createTimeOfInterest } from "astronomy-bundle/time";
import { createMoon } from "astronomy-bundle/moon";

// returns a promise
export const getMoonData = async moonSchema => {
  const moonSchemaCopy = JSON.parse(JSON.stringify(moonSchema));
  const moonDataCopy = JSON.parse(JSON.stringify(moonSchemaCopy.data));
  const date = new Date();
  const toi = createTimeOfInterest.fromDate(date);

  let newMoon = createMoon(toi);

  let km = await newMoon.getDistanceToEarth();
  let au = km * Number(6.6845871222684e-9);
  let aDiameter = await newMoon.getAngularDiameter(); // returns the answer in degrees.
  let mag = await newMoon.getApparentMagnitude();

  moonDataCopy[0].kmFromEarth = km;
  moonDataCopy[0].auFromEarth = au;
  moonDataCopy[0].angularDiameterDeg = aDiameter;
  moonDataCopy[0].magnitude = mag;

  moonSchemaCopy.data = moonDataCopy;

  return moonSchemaCopy;
};
