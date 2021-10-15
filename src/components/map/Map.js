import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Heading } from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";
import { NavLink } from "react-router-dom"; 
import geoJson from '../../geojson/states.json';
import { useData } from './useData';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const geoCounties = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const statesApi = `https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a`;
const countiesApi = `https://api.covidactnow.org/v2/counties.json?apiKey=db851a7fa0434131ad626738b50e2c0a`;
const usa = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json';


// Make this map to be used throughout the app.
// after click go to page then zoom in on state
const Map = ({ category }) => {
    const [mapData, setMapData] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");
  
    useEffect(() => {
         fetch(`https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
         .then(response => response.json())
         .then(response => setMapData(response))
    }, []);


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
    return (
        <>
            
            <ComposableMap data-tip="" projection="geoAlbersUsa">
                { mapData !== null ?
                  <Geographies geography={geoUrl}>
                      {({geographies}) => 
                        geographies.map((geo, i) => {
                          if(i === 0) console.log(geo, mapData[0]);
                          let state = mapData.find(datum => {
                              if(datum.fips === geo.id){
                                return datum
                              }
                          });
                          return (
                                  
                            <NavLink key={geo.rsmKey} to={`${geo.properties.name}?state=${state ? state.state : 'none'}-${geo.id}`}>
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  fill={state ? riskLevelCheck(state.riskLevels.overall) : ''}
                                  strokeWidth={'3px'}
                                  onMouseEnter={() => setTooltipContent(geo.properties.name)}
                                />
                            </NavLink>
                            
                          )

                        })
                      }
                  </Geographies>
                : null }
            </ComposableMap>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
        </>
    )

}

export default memo(Map);