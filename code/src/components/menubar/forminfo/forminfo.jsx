import React, { useEffect, useState, useRef, useMemo } from "react";
import FormInfoInput from "./forminfoinput";
import * as calc from "../../../utils/calc";
import PropTypes from "prop-types";
import colors from "../../../data/color-data";
import initInfoData from "../../../data/info-data";

// useEffect, actually make the comp render twice.
// because the calcs are sideEffects.

const FormInfo = (props) => {
  const {
    focallength,
    barlow,
    aperture,
    resolutionx,
    resolutiony,
    pixelsize,
    eyepiecefocallength,
  } = props.formData;
  const { hasGrid, hasRedGrid, redGridFactor, plotsizex, plotsizey, isEyepieceMode } =
    props.localCanvasData;
  const { isSubmit } = props;
  const [infoData, setInfoData] = useState(initInfoData);
  const prevRedGridState = useRef(hasRedGrid);
  const prevGridState = useRef(hasGrid);

  useEffect(() => {
    // When I submit, I set the isChanged in the infoData items to false
    // Whenever the info boxes is changed after submit, the text color changes.
    setInfoData((prevInfoData) => {
      let stateCopy = JSON.parse(JSON.stringify(prevInfoData));
      Object.keys(stateCopy).forEach((key) => {
        stateCopy[key].isChanged = false;
      });
      return { ...stateCopy };
    });
  }, [isSubmit]);

  // get Focal Ratio
  useEffect(() => {
    const focalRatio = calc.getFratio(focallength.value, barlow.value, aperture.value);

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      focalRatio: {
        ...prevInfoData.focalRatio,
        value: focalRatio,
        isChanged: true,
      },
    }));
  }, [barlow, focallength, aperture]);

  // get Aspect Ratio
  useEffect(() => {
    const aspectRatio = calc.getAspectRatio(resolutionx.value, resolutiony.value);
    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      aspectRatio: {
        ...prevInfoData.aspectRatio,
        value: aspectRatio,
        isChanged: true,
      },
    }));
  }, [resolutionx, resolutiony]);

  // get Magnification (Mag)
  useEffect(() => {
    const flengthScope = calc.getFlength(focallength.value, barlow.value);
    const mag = calc.getMag(flengthScope, eyepiecefocallength.value);

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      magnification: {
        ...prevInfoData.magnification,
        value: mag,
        isChanged: true,
      },
    }));
  }, [barlow, focallength, eyepiecefocallength]);

  // get Max Magnification (Max Mag)
  useEffect(() => {
    const maxMag = calc.getMaxMag(focallength.value, aperture.value);
    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      maxMagnification: {
        ...prevInfoData.maxMagnification,
        value: maxMag,
        isChanged: true,
      },
    }));
  }, [focallength, aperture]);

  // get pxPerSquare (Grid)
  useEffect(() => {
    const pxPerGridSquare = calc.getPxPerGridSquare(
      resolutionx.value,
      resolutiony.value,
      plotsizex,
      plotsizey,
      hasGrid,
      hasRedGrid,
      redGridFactor
    );

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      pxPerSquare: {
        ...prevInfoData.pxPerSquare,
        value: pxPerGridSquare,
        isChanged:
          hasRedGrid !== prevRedGridState.current || hasGrid !== prevGridState.current
            ? prevInfoData.pxPerSquare.isChanged
            : true,
      },
    }));

    prevRedGridState.current = hasRedGrid;
    prevGridState.current = hasGrid;
  }, [
    resolutionx,
    resolutiony,
    plotsizex,
    plotsizey,
    hasGrid,
    hasRedGrid,
    redGridFactor,
  ]);

  // get Chip Size (Chip)
  useEffect(() => {
    const result = calc.getChipSize(
      resolutionx.value,
      resolutiony.value,
      pixelsize.value
    );
    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      chipSize: {
        ...prevInfoData.chipSize,
        value: result,
        isChanged: true,
      },
    }));
  }, [resolutionx, resolutiony, pixelsize]);

  const borderColor = useMemo(() => {
    return isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
  }, [isEyepieceMode]);

  return (
    <div className={"border border-white rounded mb-1 mr-1 col bg-" + colors.background}>
      <div className="d-flex justify-content-around">
        {Object.values(infoData).map((item) => {
          if (isEyepieceMode && item.isEyepieceInfo) {
            return (
              <FormInfoInput
                borderColor={borderColor}
                key={item.key}
                title={item.key}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
          if ((!isEyepieceMode && !item.isEyepieceInfo) || item.key === "FR") {
            return (
              <FormInfoInput
                borderColor={borderColor}
                key={item.key}
                title={item.key}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
          return "";
        })}
      </div>
    </div>
  );
};

FormInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  localCanvasData: PropTypes.object.isRequired,
  isSubmit: PropTypes.bool.isRequired,
};

export default FormInfo;
