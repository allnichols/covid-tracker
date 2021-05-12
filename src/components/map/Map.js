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

    return (
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa">
                {mapData === null ? null : (
                    <Geographies geography={geoUrl}>
                        {({geographies}) => {
                            return geographies.map(geo => {
                                let state = mapData.find( s => s.fips === geo.id);
                                console.log(state)
                                return (
                                    <NavLink to={geo.properties.name}>
                                        <Geography 
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={ state ? colorScale(state.riskLevels.overall) : '#eee' }
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