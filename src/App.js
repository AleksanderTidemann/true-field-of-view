import React, { useState } from "react";
import Menubar from "./components/Menubar/Menubar";
import Chart from "./components/Chart/Chart";
import initCanvasData from "./data/canvas-data";

const App = () => {
  // this is the same as localGlobalData, only updated less frequent
  const [globalCanvasData, setGlobalCanvasData] = useState(initCanvasData);

  return (
    <React.StrictMode>
      <div className="App">
        <Menubar
          setGlobalCanvasData={setGlobalCanvasData}
          globalCanvasData={globalCanvasData}
        />
        <Chart
          setGlobalCanvasData={setGlobalCanvasData}
          globalCanvasData={globalCanvasData}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
