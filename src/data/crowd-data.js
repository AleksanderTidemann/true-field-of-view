import { PLANETIMAGES, MOONIMAGES } from "./img-data";

const initPlanetData = {
  key: "planets",
  mercury: {
    key: "mercury",
    img: PLANETIMAGES.mercury,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  venus: {
    key: "venus",
    img: PLANETIMAGES.venus,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  mars: {
    key: "mars",
    img: PLANETIMAGES.mars,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0°. 00' 12.065"
    magnitude: null,
  },
  jupiter: {
    key: "jupiter",
    img: PLANETIMAGES.jupiter,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  saturn: {
    key: "saturn",
    img: PLANETIMAGES.saturn,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  uranus: {
    key: "uranus",
    img: PLANETIMAGES.uranus,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  neptune: {
    key: "neptune",
    img: PLANETIMAGES.neptune,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
};

const initMoonData = {
  key: "moons",
  moon: {
    key: "moon",
    img: MOONIMAGES.moon,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameterDeg: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
};

const initCrowdData = {
  planets: initPlanetData,
  moons: initMoonData,
};

export default initCrowdData;
