import { PLANETIMAGES, MOONIMAGES } from "../../data/img-data";

const DEFAULT_PLANET_DATA = {
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

const DEFAULT_MOON_DATA = {
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

const DEFAULT_CROWD_DATA = {
  planets: DEFAULT_PLANET_DATA,
  moons: DEFAULT_MOON_DATA,
};

export default DEFAULT_CROWD_DATA;
