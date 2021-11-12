import React from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { useDataStates } from '../../services/useData';
import Chart from "./Chart";

export const UsaMap = ({ dimensions }) => {
  const data = useDataStates();
  const projection = geoAlbersUsa().scale();
  const path = geoPath(projection);

  return (
    <Chart dimensions={dimensions}>
        </Chart>
  );
}
