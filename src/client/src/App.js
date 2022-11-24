import React from "react";
import ModeSwitcher from "./components/ModeSwitcher/ModeSwitcher";
import FormSection from "./components/FormSection/FormSection";
import CanvasOptions from "./components/CanvasOptions/CanvasOptions";
import SelectorPlaceholder from "./components/Selector/SelectorPlaceholder";
import CanvasPlaceholder from "./components/Canvas/CanvasPlaceholder";

const App = () => {
  return (
    <div className="container p-0 App">
      <ModeSwitcher />
      <FormSection />
      <CanvasOptions />
      <SelectorPlaceholder />
      <CanvasPlaceholder />
    </div>
  );
};

export default App;
