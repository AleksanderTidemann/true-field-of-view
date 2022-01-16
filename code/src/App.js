import React, { useEffect, useState } from "react";
import Menubar from "./components/menubar/menubar";
import Chart from "./components/chart/chart";
import initCanvasData from "./data/canvas-data";

const App = () => {
  // this is the same as formDataInfo, only updated less frequent
  const [canvasData, setCanvasData] = useState(initCanvasData);

  return (
    <React.StrictMode>
      <div className="App">
        <Menubar setGlobalCanvasData={setCanvasData} />
        <Chart canvasData={canvasData} />
      </div>
    </React.StrictMode>
  );
};

export default App;
