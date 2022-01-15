import React, { useEffect, useState, useRef } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import * as calc from "../../utils/calc";
import initInfoData from "../../data/info-data";

const Info = (props) => {
  const [infoData, setInfoData] = useState(initInfoData);
  // for get pxPerSquare (Grid)
  const prevRedGridState = useRef(props.hasRedGrid);
  const prevGridState = useRef(props.hasGrid);

  // When I submit, I set the isChanged fla to false
  // Whenever the info boxes is changed after submit, the text color changes.
  useEffect(() => {
    setInfoData((prevInfoData) => {
      let stateCopy = JSON.parse(JSON.stringify(prevInfoData));
      Object.keys(stateCopy).forEach((key) => {
        stateCopy[key].isChanged = false;
      });
      return { ...stateCopy };
    });
  }, [props.isSubmit]);

  // get Focal Ratio
  useEffect(() => {
    const focalRatio = calc.getFratio(
      props.focallength.value,
      props.barlow.value,
      props.aperture.value
    );

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      focalRatio: {
        ...prevInfoData.focalRatio,
        value: focalRatio,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.aperture]);

  // get Aspect Ratio
  useEffect(() => {
    const aspectRatio = calc.getAspectRatio(
      props.resolutionx.value,
      props.resolutiony.value
    );

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      aspectRatio: {
        ...prevInfoData.aspectRatio,
        value: aspectRatio,
        isChanged: true,
      },
    }));
  }, [props.resolutionx, props.resolutiony]);

  // get Magnification (Mag)
  useEffect(() => {
    const flengthScope = calc.getFlength(
      props.focallength.value,
      props.barlow.value
    );
    const mag = calc.getMag(flengthScope, props.eyepiecefocallength.value);

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      magnification: {
        ...prevInfoData.magnification,
        value: mag,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.eyepiecefocallength]);

  // get Max Magnification (Max Mag)
  useEffect(() => {
    const maxMag = calc.getMaxMag(
      props.focallength.value,
      props.aperture.value
    );
    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      maxMagnification: {
        ...prevInfoData.maxMagnification,
        value: maxMag,
        isChanged: true,
      },
    }));
  }, [props.focallength, props.aperture]);

  // get pxPerSquare (Grid)
  useEffect(() => {
    const pxPerGridSquare = calc.getPxPerGridSquare(
      props.resolutionx.value,
      props.resolutiony.value,
      props.plotsizex,
      props.plotsizey,
      props.hasGrid,
      props.hasRedGrid,
      props.redGridFactor
    );

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      pxPerSquare: {
        ...prevInfoData.pxPerSquare,
        value: pxPerGridSquare,
        isChanged:
          props.hasRedGrid !== prevRedGridState.current ||
          props.hasGrid !== prevGridState.current
            ? prevInfoData.pxPerSquare.isChanged
            : true,
      },
    }));

    prevRedGridState.current = props.hasRedGrid;
    prevGridState.current = props.hasGrid;
  }, [
    props.resolutionx,
    props.resolutiony,
    props.plotsizex,
    props.plotsizey,
    props.hasGrid,
    props.hasRedGrid,
    props.redGridFactor,
  ]);

  // get Chip Size (Chip)
  useEffect(() => {
    const result = calc.getChipSize(
      props.resolutionx.value,
      props.resolutiony.value,
      props.pixelsize.value
    );
    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      chipSize: {
        ...prevInfoData.chipSize,
        value: result,
        isChanged: true,
      },
    }));
  }, [props.resolutionx, props.resolutiony, props.pixelsize]);

  return (
    <div
      className={
        "border border-white rounded mb-1 bg-" + props.colors.background
      }
    >
      <div className="d-flex justify-content-around">
        {Object.values(infoData).map((item) => {
          if (props.isEyepieceMode && item.isEyepieceInfo) {
            return (
              <InfoInput
                colors={props.colors}
                borderColor={
                  props.isEyepieceMode
                    ? props.colors.eyepieceMode
                    : props.colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
          if (
            (!props.isEyepieceMode && !item.isEyepieceInfo) ||
            item.name === "FR"
          ) {
            return (
              <InfoInput
                colors={props.colors}
                borderColor={
                  props.isEyepieceMode
                    ? props.colors.eyepieceMode
                    : props.colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
        })}
        <Forecast isEyepieceMode={props.isEyepieceMode} colors={props.colors} />
      </div>
    </div>
  );
};

export default Info;
