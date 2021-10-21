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

const StateMap = () => {
    const [mapData, setMapData] = useState([]);
    const [counties, setCounties] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");
    const [center, setCenter] = useState([-90, 30])
    const [zoom, setZoom] = useState(3);
    const [currentStateId, setCurrentStateId] = useState(null);
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
          // create function to zoom on initial load and a seperate one for a click
          handleGeographyClick(zoomState);
          setMapData(data);
          setCurrentStateId(stateId);          
        
      })
    }, [pathname, search])

    const projection = () => {
      return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160)
    }

    const handleGeographyClick = (geography, projection, path, county) => {
      // const path = geoPath().projection(projection());
      const bounds = path.bounds(geography);
      
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const centroid = projection().invert(path.centroid(geography));
     console.log(geography)
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
              <ZoomableGroup filterZoomEvent={handleFilter} center={center} zoom={zoom} translateExtent={[[0, -100], [50, 100]]}>
                  <Geographies geography={geoJsonCounties}>
                    {({ geographies, projection, path }) => 
                     geographies.map( (geo, i) => {
                        // add id as a state
                        let county = mapData.find( county => {
                          let geoCounty = `${geo.properties.NAME} ${geo.properties.LSAD}`;
                          if(county.county === geoCounty && geo.properties.STATE === currentStateId){
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
                                    onClick={() => handleGeographyClick(geo, projection, path, county)}
                                    onMouseEnter={() => setTooltipContent(`${geo.properties.NAME} ${geo.properties.LSAD}`)}
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