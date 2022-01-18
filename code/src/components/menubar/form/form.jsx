import React, { useCallback, useEffect, useState } from "react";
import FormSection from "./formsection/formsection";
import FormInfo from "./forminfo/forminfo";
import Forecast from "./forminfo/forecast";
import initFormData from "../../../data/form-data";
import { numberify, cam2canvas, eye2canvas } from "../../../utils/calc";
import PropTypes from "prop-types";

const Form = ({ setGlobalCanvasData, setLocalCanvasData, localCanvasData }) => {
  const [formData, setFormData] = useState(initFormData);
  const [isSubmit, setSubmit] = useState(false);

  // callBacks to avoid giving the funcs
  // new reference on every render.
  const handleFormChange = useCallback((value, target) => {
    setFormData((prevData) => {
      let keyCopy = { ...prevData[target] };
      keyCopy.value = value;
      prevData[target] = keyCopy;
      return { ...prevData };
    });
    setSubmit((prevSubmit) => (prevSubmit ? false : prevSubmit));
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSubmit(true);
      setGlobalCanvasData({ ...localCanvasData });
    },
    [setGlobalCanvasData, localCanvasData]
  );

  // reset the formdata when the mode changes.
  useEffect(() => {
    setFormData({ ...initFormData });
    setSubmit((prevSubmit) => (prevSubmit ? false : prevSubmit));
  }, [localCanvasData.isEyepieceMode]);

  // converts formData to localCanvasData
  // calls the setLocalCanvasData in
  // parent component to avoid
  // unnecessary re-renders.
  useEffect(() => {
    let newFormDataInfo = [];
    if (localCanvasData.isEyepieceMode) {
      let epAFOV = numberify(formData.eyepieceafov.value);
      let epFL = numberify(formData.eyepiecefocallength.value);
      let FL = numberify(formData.focallength.value);
      let b = numberify(formData.barlow.value);

      let vars = [epAFOV, epFL, FL, b];

      // if there are no 0 value in any of the variables
      newFormDataInfo = vars.indexOf(0) === -1 ? eye2canvas(...vars) : {};
    } else {
      let pxS = numberify(formData.pixelsize.value);
      let resX = numberify(formData.resolutionx.value);
      let resY = numberify(formData.resolutiony.value);
      let FL = numberify(formData.focallength.value);
      let b = numberify(formData.barlow.value);

      let vars = [pxS, resX, resY, FL, b];

      // if there are no 0 values in any of the variables
      newFormDataInfo = vars.indexOf(0) === -1 ? cam2canvas(...vars) : {};
    }

    if (Object.keys(newFormDataInfo).length) {
      setLocalCanvasData((prev) => ({
        ...prev,
        ...newFormDataInfo,
      }));
    }
  }, [formData, setLocalCanvasData, localCanvasData.isEyepieceMode]);

  return (
    <>
      <FormSection
        isEyepieceMode={localCanvasData.isEyepieceMode}
        formData={formData}
        onFormInputChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <FormInfo
        formData={formData}
        localCanvasData={localCanvasData}
        isSubmit={isSubmit}
      >
        <Forecast
          isEyepieceMode={localCanvasData.isEyepieceMode}
          key="Forecast"
        />
      </FormInfo>
    </>
  );
};

Form.protoTypes = {
  setGlobalCanvasData: PropTypes.func.isRequired,
  setLocalCanvasData: PropTypes.func.isRequired,
  localCanvasData: PropTypes.object.isRequired,
};

export default Form;
