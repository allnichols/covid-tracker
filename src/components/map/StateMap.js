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
import geoJson from '../../geojson/states.json';

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
    const [center, setCenter] = useState([-90, 30])
    const [zoom, setZoom] = useState(3);
    const { pathname, search } = useLocation();
    let state = search.slice(-2);

    useEffect(() => {
      Promise.all([
        fetch(`https://api.covidactnow.org/v2/county/${state}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`).then(resp => resp.json()),
        fetch(geoUrlCounties).then(resp => resp.json())
      ])
      .then( response => {
        let data = response[0];
        let states = response[1].objects.states.geometries;
        let selectedState = pathname.replace('/', '');
        
       let foundState = states.filter( state => {
          if(state.properties.name === selectedState){
            console.log(state)
            return state;
          } else {
            return false;
          }
        });

        // handleGeographyClick(foundState[0])

      })
    }, [state])

    const projection = () => {
      return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160)
    }

    const handleGeographyClick = (geography, event) => {
      // event.persist();
      console.log(geography)
      const path = geoPath().projection(projection());
      const centroid = projection().invert(path.centroid(geography));
      
      setCenter(centroid);
      setZoom(3);
    };

    const handleFilter = ({ constructor: { name } }) => {
      return name !== "MouseEvent";
    };

    return ( 
        <>
            <ComposableMap data-tip="" preserveAspectRatio="none">
              <ZoomableGroup filterZoomEvent={handleFilter} center={center} zoom={zoom}>
                  <Geographies geography={geoJson}>
                    {({ geographies }) => 
                       geographies.map( (geo, i) => {
                        let county = mapData.find( county => county.fips === geo.id);
                        
                            return (
                                <Geography 
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={ county ? riskLevelCheck(county.riskLevels.overall) : "#eee"}
                                    strokeWidth={ !county ? 0 : 2}
                                    fillOpacity={'1px'}
                                    onClick={(e) => handleGeographyClick(geo,e)}
                                />
                            )
                        })
                    }
                  </Geographies>  
              </ZoomableGroup>
            </ComposableMap>
        </>
     );
}
 
export default StateMap;