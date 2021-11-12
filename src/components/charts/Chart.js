import React, { createContext, useContext } from "react";

const ChartContext = createContext();
export const useChartDimensions = () => useContext(ChartContext);

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    <svg
      style={{ overflow: "visible" }}
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      width={dimensions.width}
      height={dimensions.height}
    >
      <g>{children}</g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;