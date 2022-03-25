import { createTimeOfInterest } from "astronomy-bundle/time";
import { createMoon } from "astronomy-bundle/moon";

// returns a promise
const getEarthMoonData = async earthMoonSchema => {
  const earthMoonSchemaCopy = JSON.parse(JSON.stringify(earthMoonSchema));
  const earthMoonDataCopy = JSON.parse(
    JSON.stringify(earthMoonSchemaCopy.data)
  );
  const date = new Date();
  const toi = createTimeOfInterest.fromDate(date);

  let newMoon = createMoon(toi);

  let km = await newMoon.getDistanceToEarth();
  let au = km * Number(6.6845871222684e-9);
  let aDiameter = await newMoon.getAngularDiameter(); // returns the answer in degrees.
  let mag = await newMoon.getApparentMagnitude();

  earthMoonDataCopy[0].kmFromEarth = km;
  earthMoonDataCopy[0].auFromEarth = au;
  earthMoonDataCopy[0].angularDiameterDeg = aDiameter;
  earthMoonDataCopy[0].magnitude = mag;

  earthMoonSchemaCopy.data = earthMoonDataCopy;

  return earthMoonSchemaCopy;
};

export default getEarthMoonData;
