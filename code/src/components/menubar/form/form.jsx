import React, { useCallback, useEffect, useState } from "react";
import FormSection from "./formsection/formsection";
import FormInfo from "./forminfo/forminfo";
import Forecast from "./forminfo/forecast";
import initFormData from "../../../data/form-data";
import { numberify, cam2canvas, eye2canvas } from "../../../utils/calc";

// useCallback() = return a memo function when the deps changes. Use it when I dont know what the output of the function is.
// useMemo() = retursn the value of the memo function. Use it when I know what the reutnr of rhte func is.
// memo() = HOC that does the same as useMemo(). The "key" props allow React to identify elements across renders. They're most commonly used when rendering a list of items.
// useEffect() = Sideeffects of the current state of the component.

// reducer.. more
// context.Provider. useContext() over many components

const Form = ({ onFormSubmit, setFormDataInfo, formDataInfo }) => {
  const [formData, setFormData] = useState(initFormData);
  // When changing the mode and adding any new form info, the subitflag goes to false.
  const [isSubmit, setSubmit] = useState(false);

  // should be just a callback with [] as dep
  // is cached at mount and never changes.
  const handleFormChange = (e) => {
    setFormData((prevData) => {
      let newValue = e.target.value;
      let keyRef = e.target.id;
      let keyCopy = { ...prevData[keyRef] };
      keyCopy.value = newValue;
      prevData[keyRef] = keyCopy;
      return { ...prevData };
    });
    setSubmit((prevSubmit) => (prevSubmit ? false : prevSubmit));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    onFormSubmit();
    // kanskje bare send submitflagget oppover til menubar?
  };

  // reset the formdata when the mode changes.
  useEffect(() => {
    setFormData(initFormData);
    setSubmit((prevSubmit) => (prevSubmit ? false : prevSubmit));
  }, [formDataInfo.isEyepieceMode]);

  // converts formData to formDataInfo
  useEffect(() => {
    let newFormDataInfo = [];
    if (formDataInfo.isEyepieceMode) {
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
      setFormDataInfo((prev) => ({
        ...prev,
        ...newFormDataInfo,
      }));
    }
  }, [formData, setFormDataInfo, formDataInfo.isEyepieceMode]);

  return (
    <>
      <FormSection
        isEyepieceMode={formDataInfo.isEyepieceMode}
        formData={formData}
        onFormInputChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <FormInfo
        formData={formData}
        formDataInfo={formDataInfo}
        isSubmit={isSubmit}
      >
        <Forecast isEyepieceMode={formDataInfo.isEyepieceMode} key="Forecast" />
      </FormInfo>
    </>
  );
};

export default Form;
