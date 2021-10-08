import React, { useEffect, useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
  } from "react-simple-maps";
import { useLocation } from 'react-router';
import { geoPath } from 'd3-geo';
import { geoTimes } from 'd3-geo-projection';

const geoUrlCounties = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


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
    const [center, setCenter] = useState([-90, 30])
    const [zoom, setZoom] = useState(1);
    const { search, pathname } = useLocation();
    
    useEffect(() => {
        let state = search.substring(7,9)
        console.log(state)
        fetch(`https://api.covidactnow.org/v2/county/${state}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
        .then(response => response.json())
        .then(response => {
            setMapData(response);
        });

        console.log(search, pathname)
        
        handleGeographyClick()

    }, [search])

    const projection = () => {
      return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160)
    }

    const handleGeographyClick = (geography) => {
      const path = geoPath().projection(projection());
      const centroid = projection().invert(path.centroid(geography));
      setCenter(centroid);
      setZoom(4);
    };

    const handleFilter = ({ constructor: { name } }) => {
      return name !== "MouseEvent";
    };
    return ( 
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa" >
           
            </ComposableMap>
        </>
     );
}
 
export default StateMap;