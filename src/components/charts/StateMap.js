import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { useParams,  useLocation } from 'react-router-dom';
import { useCountyData } from '../../services/useData';
import Chart from './Chart';

export const StateMap = ({ dimensions }) => {
    const stateMap = useCountyData();
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        let state = location.search.split('-')[1];
        fetch(`https://api.covidactnow.org/v2/county/${state}.json?apiKey=db851a7fa0434131ad626738b50e2c0a&state=${state}`)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
            })
    }, []);

    const projection = geoAlbersUsa()
        .scale([dimensions.width])
        .translate([dimensions.width / 2, dimensions.height / 2]);
    const path = geoPath(projection)
    
    if(!stateMap) return null;
    
    return (
        
            <Chart dimensions={dimensions}>
                <g>
                {stateMap.land.features.map((feature, i) => {
                    
                    return (
                        <path
                            key={`path-${i}`}
                            stroke="white"
                            fill="none"
                            d={path(feature)}
                        />
                    );
                })}
                </g>
                <path fill="white" path={path(stateMap.states)} />
            </Chart>
        
    )
};
