import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./form";
import Info from "./info";
import CanvasOptions from "./canvasoptions";
import PropTypes from "prop-types";

const Menubar = (props) => (
  <div className="container p-0">
    <BootstrapSwitchButton
      checked={props.formDataInfo.isEyepieceMode}
      onlabel="Camera"
      onstyle={props.colors.eyepieceMode}
      offlabel="Eyepiece"
      offstyle={props.colors.cameraMode}
      onChange={props.onModeChange}
      style="w-100 mb-1 mt-2"
    />
    <Form
      isEyepieceMode={props.formDataInfo.isEyepieceMode}
      colors={props.colors}
      formData={props.formData}
      onFormChange={props.onFormChange}
      onFormSubmit={props.onFormSubmit}
    />
    <Info
      isSubmit={props.isSubmit}
      focallength={props.formData.focallength}
      barlow={props.formData.barlow}
      aperture={props.formData.aperture}
      resolutionx={props.formData.resolutionx}
      resolutiony={props.formData.resolutiony}
      pixelsize={props.formData.pixelsize}
      eyepiecefocallength={props.formData.eyepiecefocallength}
      hasGrid={props.formDataInfo.hasGrid}
      hasRedGrid={props.formDataInfo.hasRedGrid}
      redGridFactor={props.formDataInfo.redGridFactor}
      plotsizex={props.formDataInfo.plotSizeX}
      plotsizey={props.formDataInfo.plotSizeY}
      isEyepieceMode={props.formDataInfo.isEyepieceMode}
      colors={props.colors}
    />
    <CanvasOptions
      colors={props.colors}
      zoomValue={props.formDataInfo.zoomValue}
      hasLabels={props.formDataInfo.hasLabels}
      isEyepieceMode={props.formDataInfo.isEyepieceMode}
      hasGrid={props.formDataInfo.hasGrid}
      hasRedGrid={props.formDataInfo.hasRedGrid}
      onZoomChange={props.onZoomChange}
      onGridChange={props.onGridChange}
      onLabelChange={props.onLabelChange}
      onRedGridChange={props.onRedGridChange}
    />
  </div>
);

Menubar.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  onGridChange: PropTypes.func.isRequired,
  onRedGridChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onZoomChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  formDataInfo: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  isSubmit: PropTypes.bool.isRequired,
};

export default Menubar;
