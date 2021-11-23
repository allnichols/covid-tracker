import React, { useEffect, useState } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { useDataStates } from '../../services/useData';
import ReactTooltip from "react-tooltip";
import { Link } from 'react-router-dom';
import Chart from "./Chart";

const riskLevelCheck = (num) => {
  switch (num) {
    case 0:
      return "#00d474";
    case 1:
      return "#ffc900";
    case 2:
      return "#ff9600";
    case 3:
      return "#d9002c";
    case 4:
      return "#790019";
    case 5:
      return "#790019";
    default:
  }
};

export const UsaMap = ({ dimensions }) => {
  const [mapData, setMapData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const data = useDataStates();
  const projection = geoAlbersUsa()
    .scale([dimensions.width])
    .translate([dimensions.width / 2, dimensions.height / 2.15]);
  const path = geoPath(projection);

  useEffect(() => {
    fetch(`https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
      .then(response => response.json())
      .then(response => setMapData(response))
  }, []);

  if (!mapData || !data) return null;

  return (
    <div data-tip="">
      <Chart dimensions={dimensions}>
        {data.land.features.map((feature, i) => {
          let state = mapData.find(state => state.fips === feature.id);
          if (state) {
            return (
              <Link key={state.fips} to={`${state.fips}?state=${feature.properties.name}-${state.state}`}>
                <path
                  key={`path-${i}`}
                  d={path(feature)}
                  fill={riskLevelCheck(state.riskLevels.overall)}
                  stroke="white"
                  onMouseOver={() => setTooltipContent(feature.properties.name)}
                />
              </Link>
            );
          } return null;
        })}
        <path fill="none" d={path(data.states)} />
      </Chart>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </div>
  );
}
