import React, { useEffect, useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
  } from "react-simple-maps";
import { useLocation } from 'react-router';

const geoUrlCounties = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

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


const StateMap = () => {
    const [mapData, setMapData] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");
    const [position, setPosition] = useState({ coordinates: [50, 50], zoom: 5})
    const { search } = useLocation();
    let state = search.slice(-2);

    useEffect(() => {
        fetch(`https://api.covidactnow.org/v2/county/${state}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
        .then(response => response.json())
        .then(response => {
            setMapData(response);
            console.log(response)
        })
    }, [])
    // https://github.com/zcreativelabs/react-simple-maps/issues/175
    return ( 
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa" projectionConfig={{scale:4000, center:[10, 10]}}>
                {mapData === null ? null : (
                    <ZoomableGroup>

                    <Geographies geography={geoUrlCounties}>
                    {({ geographies }) => {
                       return geographies.map( (geo, i) => {
                        let county = mapData.find( county => county.fips === geo.id);
                        console.log(geo)
                            return (
                                <Geography 
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={ county ? riskLevelCheck(county.riskLevels.overall) : "#eee"}
                                    strokeWidth={ !county ? 0 : 2}
                                    fillOpacity={'1px'}

                                />
                            )
                        })
                    }}
                </Geographies>  
                </ZoomableGroup>

                )}
                         
            </ComposableMap>
        </>
     );
}
 
export default StateMap;