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

const geoCounties = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const StateMap = () => {
    const [mapData, setMapData] = useState([]);
    const [counties, setCounties] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");
    const [center, setCenter] = useState([-90, 30])
    const [zoom, setZoom] = useState(3);
    const [currentStateAbbreviation, setCurrentStateAbbreviation] = useState(null);
    const { pathname, search } = useLocation();

    useEffect(() => {
       let stateAbbreviation = search.substring(7,9);
       let stateId = search.slice(-2);
        fetch(`https://api.covidactnow.org/v2/county/${stateAbbreviation}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
        .then( response => response.json())
        .then( response => {
          let data = response;
          let selectedState = pathname.replace('/', '');
          let zoomState = geoJsonStates.features.find( state => state.properties.NAME === selectedState);
          handleGeographyClick(zoomState);
          setMapData(data);
          setCurrentStateAbbreviation(stateAbbreviation);          
        
      })
    }, [pathname, search])

    const projection = () => {
      return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160)
    }

    const handleGeographyClick = (geography, county) => {
      const path = geoPath().projection(projection());
      const centroid = projection().invert(path.centroid(geography));

      setCenter(centroid);
      setZoom(3);
    };

    const handleFilter = ({ constructor: { name } }) => {
      return name !== "MouseEvent";
    };

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
              <ZoomableGroup filterZoomEvent={handleFilter} center={center} zoom={zoom}>
                  <Geographies geography={geoJsonCounties}>
                    {({ geographies }) => 
                     geographies.map( (geo, i) => {
                        // add id as a state
                        let county = mapData.find( county => {
                          let geoCounty = `${geo.properties.NAME} ${geo.properties.LSAD}`;
                          if(county.county === geoCounty && county.state === currentStateAbbreviation){
                            console.log(county)
                            return county;
                          }
                          return false;
                        });
                      
                            return (
                                <Geography 
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={ county ? riskLevelCheck(county.riskLevels.overall) : '#eee'}
                                    projection={`${projection}`}
                                    strokeWidth={ !county ? 0 : 2}
                                    fillOpacity={'2px'}
                                    // // onClick={() => handleGeographyClick(geo, county)}
                                    onMouseEnter={() => setTooltipContent(`${geo.properties.NAME} ${geo.properties.LSAD} - ${county ? county.riskLevels.overall : 'none'}`)}
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