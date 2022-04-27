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

export const createCurrBody = () => {};
