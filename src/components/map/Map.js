import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import ReactTooltip from "react-tooltip";
import { scaleQuantile } from "d3-scale";
import { NavLink } from "react-router-dom"; 

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Map = ({ category }) => {
    const [mapData, setMapData] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");

    useEffect(() => {
         fetch(`https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
         .then(response => response.json())
         .then(response => setMapData(response))
    }, []);

    const colorScale = scaleQuantile()
            .domain(mapData.map(d => d.riskLevels.overall))
            .range([
                "#00d474",
                "#ffc900",
                "#ff9600",
                "#d9002c",
                "#790019"
            ]);

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
                  default:
                    break;
                
                }
            };

    return (
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa">
                {mapData === null ? null : (
                    <Geographies geography={geoUrl}>
                        {({geographies}) => {
                            return geographies.map(geo => {
                                let state = mapData.find( s => s.fips === geo.id);
                            
                                return (
                                    <NavLink to={geo.properties.name}>
                                        <Geography 
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={ state ? riskLevelCheck(state.riskLevels.overall) : '#eee' }
                                            strokeWidth={'2px'}
                                            fillOpacity={'1px'}
                                            stroke={"white"}
                                        />
                                    </NavLink>
                                )

                            })  
                        }}
                    </Geographies>
                )}
            </ComposableMap>
        </>
    )

}

export default memo(Map);