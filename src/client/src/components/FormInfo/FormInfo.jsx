import React, { useEffect, useState, useRef } from "react";
import FormInfoInput from "./FormInfoInput";
import * as calc from "../../utils/calc";
import PropTypes from "prop-types";
import INFO_SCHEMA from "./infoDataSchema";

import { useSelector } from "react-redux";
import { getUserData } from "../../store/slices/canvasSlice";
import { getColors } from "../../store/slices/colorSlice";

const FormInfo = ({ formData, isSubmit }) => {
  const canvasData = useSelector(getUserData);
  const colors = useSelector(getColors);

  const [infoData, setInfoData] = useState(INFO_SCHEMA);
  const {
    hasGrid,
    hasRedGrid,
    redGridFactor,
    plotSizeX,
    plotSizeY,
    isEyepieceMode,
  } = canvasData;
  const {
    focallength,
    barlow,
    aperture,
    resolutionx,
    resolutiony,
    pixelsize,
    eyepiecefocallength,
  } = formData;
  const prevRedGridState = useRef(hasRedGrid);
  const prevGridState = useRef(hasGrid);

  useEffect(() => {
    // When I submit, I set the isChanged in the infoData items to false
    // Whenever the info boxes is changed after submit, the text color changes.
    setInfoData(prevInfoData => {
      let stateCopy = JSON.parse(JSON.stringify(prevInfoData));
      Object.keys(stateCopy).forEach(key => {
        stateCopy[key].isChanged = false;
      });
      // dont think I need to immutate it again here?
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

    setInfoData(prevInfoData => ({
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
    setInfoData(prevInfoData => ({
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

    setInfoData(prevInfoData => ({
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
    setInfoData(prevInfoData => ({
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
      plotSizeX,
      plotSizeY,
      hasGrid,
      hasRedGrid,
      redGridFactor
    );

    // if only the canvasOptions change, then keep the isChanged value the same.
    // might be a little too complicated. Maybe not needed when moving the canvasOption to the chart.
    // If this only updates when the chart has been submitted, then I dont need to worry about this. the canvsoptions shouldnt effect this at all then.
    setInfoData(prevInfoData => ({
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
    plotSizeX,
    plotSizeY,
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
    setInfoData(prevInfoData => ({
      ...prevInfoData,
      chipSize: {
        ...prevInfoData.chipSize,
        value: result,
        isChanged: true,
      },
    }));
  }, [resolutionx, resolutiony, pixelsize]);

  return (
    <div
      className={
        "border border-white rounded mb-1 mr-1 col bg-" + colors.background
      }
    >
      <div className="d-flex justify-content-around">
        {Object.values(infoData).map(item => {
          if (isEyepieceMode && item.isEyepieceInfo) {
            return (
              <FormInfoInput
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
  isSubmit: PropTypes.bool.isRequired,
};

export default FormInfo;
