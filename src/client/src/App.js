import React from "react";
import ModeSwitcher from "./components/ModeSwitcher/ModeSwitcher";
import FormSection from "./components/FormSection/FormSection";
import CanvasOptions from "./components/CanvasOptions/CanvasOptions";
import SelectorPlaceholder from "./components/Selector/SelectorPlaceholder";
import CanvasPlaceholder from "./components/Canvas/CanvasPlaceholder";

const App = () => {
  return (
    <div className="App container p-0">
      <ModeSwitcher />
      <FormSection />
      <CanvasOptions />
      <SelectorPlaceholder />
      <CanvasPlaceholder />
    </div>
  );
};

export default App;
