import React, { useEffect, useState, useRef } from "react";
import InfoInput from "./infoinput";
import * as calc from "../../utils/calc";
import initInfoData from "../../data/info-data";
import PropTypes from "prop-types";

const Info = (props) => {
  const {
    focallength,
    barlow,
    aperture,
    resolutionx,
    resolutiony,
    pixelsize,
    eyepiecefocallength,
  } = props.formData;
  const {
    hasGrid,
    hasRedGrid,
    redGridFactor,
    plotsizex,
    plotsizey,
    isEyepieceMode,
  } = props.formDataInfo;
  const { colors, isSubmit } = props;

  const [infoData, setInfoData] = useState(initInfoData);
  const prevRedGridState = useRef(hasRedGrid);
  const prevGridState = useRef(hasGrid);

  // When I submit, I set the isChanged to false
  // Whenever the info boxes is changed after submit, the text color changes.
  useEffect(() => {
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
    const focalRatio = calc.getFratio(
      focallength.value,
      barlow.value,
      aperture.value
    );

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
    const aspectRatio = calc.getAspectRatio(
      resolutionx.value,
      resolutiony.value
    );

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
          hasRedGrid !== prevRedGridState.current ||
          hasGrid !== prevGridState.current
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

  return (
    <div className={"border border-white rounded mb-1 bg-" + colors.background}>
      <div className="d-flex justify-content-around">
        {Object.values(infoData).map((item) => {
          if (isEyepieceMode && item.isEyepieceInfo) {
            return (
              <InfoInput
                colors={colors}
                borderColor={
                  isEyepieceMode ? colors.eyepieceMode : colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
          if ((!isEyepieceMode && !item.isEyepieceInfo) || item.name === "FR") {
            return (
              <InfoInput
                colors={colors}
                borderColor={
                  isEyepieceMode ? colors.eyepieceMode : colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
        })}
        {props.children}
      </div>
    </div>
  );
};

Info.propTypes = {
  formData: PropTypes.object.isRequired,
  formDataInfo: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  isSubmit: PropTypes.bool.isRequired,
};

export default Info;
