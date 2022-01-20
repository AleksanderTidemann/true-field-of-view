import React, { useState } from "react";
import Menubar from "./components/menubar/menubar";
import Chart from "./components/chart/chart";
import initCanvasData from "./data/canvas-data";

const App = () => {
  // this is the same as local, only updated less frequent
  const [globalCanvasData, setGlobalCanvasData] = useState(initCanvasData);

  return (
    <React.StrictMode>
      <div className="App">
        <div className="container p-0">
          <Menubar setGlobalCanvasData={setGlobalCanvasData} />
        </div>
        <div className="container p-0">
          <Chart globalCanvasData={globalCanvasData} />
        </div>
      </div>
    </React.StrictMode>
  );
};

export default App;
