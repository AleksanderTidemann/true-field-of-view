import { createTimeOfInterest } from "astronomy-bundle/time";
import { createMoon } from "astronomy-bundle/moon";
import {
  createMars,
  createVenus,
  createMercury,
  createJupiter,
  createSaturn,
  createUranus,
  createNeptune,
} from "astronomy-bundle/planets";

const getPlanet = {
  mercury: e => createMercury(e),
  venus: e => createVenus(e),
  mars: e => createMars(e),
  jupiter: e => createJupiter(e),
  saturn: e => createSaturn(e),
  uranus: e => createUranus(e),
  neptune: e => createNeptune(e),
  moon: e => createMoon(e),
};

// returns a promise
export const getPlanetData = async planetSchema => {
  const planetSchemaCopy = JSON.parse(JSON.stringify(planetSchema));
  const planetDataCopy = JSON.parse(JSON.stringify(planetSchema.data));
  const date = new Date();
  const toi = createTimeOfInterest.fromDate(date);

  for (let i = 0; i < planetDataCopy.length; i++) {
    let currBodyName = planetDataCopy[i].key;
    let currPlanetMethod = getPlanet[currBodyName];

    let newBodyData = currPlanetMethod(toi);

    let km = await newBodyData.getDistanceToEarth();
    let au = km * Number(6.6845871222684e-9);
    let aDiameter = await newBodyData.getAngularDiameter(); // returns the answer in degrees.
    let mag = await newBodyData.getApparentMagnitude();

    planetDataCopy[i].kmFromEarth = km;
    planetDataCopy[i].auFromEarth = au;
    planetDataCopy[i].angularDiameterDeg = aDiameter;
    planetDataCopy[i].magnitude = mag;
  }

  planetSchemaCopy.data = planetDataCopy;

  return planetSchemaCopy;
};
