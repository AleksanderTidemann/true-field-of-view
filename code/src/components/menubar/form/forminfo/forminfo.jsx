import React, { useEffect, useState, useRef } from "react";
import FormInfoInput from "./forminfoinput";
import * as calc from "../../../../utils/calc";
import initFormInfoData from "../../../../data/form-info-data";
import PropTypes from "prop-types";
import colors from "../../../../data/color-data";

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
  const {
    hasGrid,
    hasRedGrid,
    redGridFactor,
    plotsizex,
    plotsizey,
    isEyepieceMode,
  } = props.formDataInfo;
  const { isSubmit } = props;
  const [formInfoData, setFormInfoData] = useState(initFormInfoData);
  const prevRedGridState = useRef(hasRedGrid);
  const prevGridState = useRef(hasGrid);

  // When I submit, I set the isChanged to false
  // Whenever the info boxes is changed after submit, the text color changes.
  useEffect(() => {
    setFormInfoData((prevInfoData) => {
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

    setFormInfoData((prevInfoData) => ({
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
    setFormInfoData((prevInfoData) => ({
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

    setFormInfoData((prevInfoData) => ({
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
    setFormInfoData((prevInfoData) => ({
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

    setFormInfoData((prevInfoData) => ({
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
    setFormInfoData((prevInfoData) => ({
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
        {Object.values(formInfoData).map((item) => {
          if (isEyepieceMode && item.isEyepieceInfo) {
            return (
              <FormInfoInput
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
              <FormInfoInput
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
          return "";
        })}
        {props.children}
      </div>
    </div>
  );
};

FormInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  formDataInfo: PropTypes.object.isRequired,
  isSubmit: PropTypes.bool.isRequired,
};

export default FormInfo;
