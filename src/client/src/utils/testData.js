// equal to my telescope setup with:
// Phillips SCP900NC Webcam
// 10mm eyepiece with a standard 40 afov
export const mockFormData = () => ({
  formData: {
    aperture: { value: "114" },
    focallength: { value: "1000" },
    barlow: { value: "2" },
    pixelsize: { value: "31.36" }, // in microns squared
    resolutionx: { value: "640" },
    resolutiony: { value: "480" },
    eyepiecefocallength: { value: "10" }, // in milimeters
    eyepieceafov: { value: "40" }, // in degrees
  },
  eyeResult: {
    plotSizeX: 72,
    plotSizeY: 72,
    angularUnit: "Minutes of Arc",
  },
  camResult: {
    plotSizeX: 37,
    plotSizeY: 28,
    angularUnit: "Minutes of Arc",
  },
});

// My coords in Norway:
export const userCoords = { lat: 59.93, long: 10.69 };

// a copy of the initial successfull onLoad redux state on may 14th 2022.
// for use in util/reduxTestRender.js
export const preloadedState = {
  canvas: {
    lastFetch: 0,
    isLoading: false,
    isError: false,
    defaultData: {
      isEyepieceMode: true,
      hasGrid: true,
      hasLabels: true,
      hasRedGrid: false,
      redGridFactor: 6,
      zoomValue: 50,
      zoomIncrement: 10,
      plotSizeX: 20,
      plotSizeY: 20,
      angularUnit: "Minutes of Arc",
    },
    userData: {
      isEyepieceMode: true,
      hasGrid: true,
      hasLabels: true,
      hasRedGrid: false,
      redGridFactor: 6,
      zoomValue: 50,
      zoomIncrement: 10,
      plotSizeX: 20,
      plotSizeY: 20,
      angularUnit: "Minutes of Arc",
    },
  },
  crowds: {
    lastFetch: 1652550868448,
    isLoading: false,
    isError: false,
    crowdData: [
      {
        key: "planets",
        data: [
          {
            key: "mercury",
            auFromEarth: 0.5897955793632621,
            kmFromEarth: 88232162.82101747,
            angularDiameterDeg: 0.0031683259986192177,
            magnitude: 3.740962366721025,
          },
          {
            key: "venus",
            auFromEarth: 1.0996234201789619,
            kmFromEarth: 164501322.2306252,
            angularDiameterDeg: 0.004216119021231262,
            magnitude: -4.024017871765406,
          },
          {
            key: "mars",
            auFromEarth: 1.551513621659727,
            kmFromEarth: 232103134.16234213,
            angularDiameterDeg: 0.001676826883700434,
            magnitude: 0.7864478101958278,
          },
          {
            key: "jupiter",
            auFromEarth: 5.508107389964577,
            kmFromEarth: 824001137.1256409,
            angularDiameterDeg: 0.009942260441414169,
            magnitude: -2.1510961227080463,
          },
          {
            key: "saturn",
            auFromEarth: 9.856010404327547,
            kmFromEarth: 1474438170.0844572,
            angularDiameterDeg: 0.004683965181107916,
            magnitude: 0,
          },
          {
            key: "uranus",
            auFromEarth: 20.702548336826037,
            kmFromEarth: 3097057149.2530227,
            angularDiameterDeg: 0.0009456860457756195,
            magnitude: 5.863747712475078,
          },
          {
            key: "neptune",
            auFromEarth: 30.425281930390135,
            kmFromEarth: 4551557392.233581,
            angularDiameterDeg: 0.0006234671553541644,
            magnitude: 7.795800104113368,
          },
        ],
      },
      {
        key: "moons",
        data: [
          {
            key: "moon",
            auFromEarth: 0.002454673513496998,
            kmFromEarth: 367213.9308828411,
            angularDiameterDeg: 0.5421632251951733,
            magnitude: -12.287452998991068,
          },
        ],
      },
    ],
    currCrowd: {
      key: "planets",
      data: [
        {
          key: "mercury",
          auFromEarth: 0.5897955793632621,
          kmFromEarth: 88232162.82101747,
          angularDiameterDeg: 0.0031683259986192177,
          magnitude: 3.740962366721025,
        },
        {
          key: "venus",
          auFromEarth: 1.0996234201789619,
          kmFromEarth: 164501322.2306252,
          angularDiameterDeg: 0.004216119021231262,
          magnitude: -4.024017871765406,
        },
        {
          key: "mars",
          auFromEarth: 1.551513621659727,
          kmFromEarth: 232103134.16234213,
          angularDiameterDeg: 0.001676826883700434,
          magnitude: 0.7864478101958278,
        },
        {
          key: "jupiter",
          auFromEarth: 5.508107389964577,
          kmFromEarth: 824001137.1256409,
          angularDiameterDeg: 0.009942260441414169,
          magnitude: -2.1510961227080463,
        },
        {
          key: "saturn",
          auFromEarth: 9.856010404327547,
          kmFromEarth: 1474438170.0844572,
          angularDiameterDeg: 0.004683965181107916,
          magnitude: 0,
        },
        {
          key: "uranus",
          auFromEarth: 20.702548336826037,
          kmFromEarth: 3097057149.2530227,
          angularDiameterDeg: 0.0009456860457756195,
          magnitude: 5.863747712475078,
        },
        {
          key: "neptune",
          auFromEarth: 30.425281930390135,
          kmFromEarth: 4551557392.233581,
          angularDiameterDeg: 0.0006234671553541644,
          magnitude: 7.795800104113368,
        },
      ],
    },
    currBody: {},
  },
  colors: {
    eyepieceMode: "info",
    cameraMode: "success",
    background: "gradient-dark",
    text: "text-white",
    textMuted: "text-muted",
    canvasBorder: "#7C7C7C",
    canvasText: "#ffffff",
    canvasGrid: "#2c2c2c",
  },
  forecast: {
    lastFetch: 0,
    isLoading: false,
    isError: false,
    data: {},
  },
};
