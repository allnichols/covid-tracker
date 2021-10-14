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
import geoJsonCounties from '../../geojson/counties.json';
import geoJsonStates from '../../geojson/states.json';
import ReactTooltip from 'react-tooltip';

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
    const [currentState, setCurrentState] = useState(null);
    const { pathname, search } = useLocation();
    let state = search.slice(-2);

    useEffect(() => {
      
        fetch(`https://api.covidactnow.org/v2/county/${state}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
        .then( response => response.json())
        .then( response => {
          let data = response;
          let selectedState = pathname.replace('/', '');
          setMapData(data);
          let zoomState = geoJsonStates.features.find( state => state.properties.NAME === selectedState);
          handleGeographyClick(zoomState);
          setCurrentState(selectedState);          

      })
    }, [state])

    const projection = () => {
      return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160)
    }

    const handleGeographyClick = (geography, county) => {
      console.log(geography, county)
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
            <ComposableMap data-tip="" projection="geoAlbersUsa">
              <ZoomableGroup filterZoomEvent={handleFilter} center={center} zoom={zoom}>
                  <Geographies geography={geoJsonCounties}>
                    {({ geographies }) => 
                       geographies.map( (geo, i) => {

                        let county = mapData.find( county => {
                          
                          return county.county === geo.properties.NAME + ' ' + geo.properties.LSAD;
                        });
                          
                            return (
                                <Geography 
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={ county ? riskLevelCheck(county.riskLevels.overall) : "#eee"}
                                    projection={`${projection}`}
                                    strokeWidth={ !county ? 0 : 2}
                                    fillOpacity={'1px'}
                                    onClick={() => handleGeographyClick(geo, county)}
                                    onMouseEnter={() => setTooltipContent(geo.properties.NAME + ' ' + geo.properties.LSAD)}
                                    style={{
                                      default: { outline: "none" },
                                      hover: { outline: "none" },
                                      pressed: { outline: "none" },
                                    }}
                                />
                            )
                        })
                    }
                  </Geographies>  
              </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
        </>
     );
}
 
export default StateMap;