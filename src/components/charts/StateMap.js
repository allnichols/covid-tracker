import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { useParams,  useLocation } from 'react-router-dom';
import { useCountyData } from '../../services/useData';
import { useChartDimensions } from '../../utils/useChartDimensions';
import Chart from './Chart';

export const StateMap = ({ dimensions }) => {
    // const [ref, dimensions] = useChartDimensions();
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
    console.log( dimensions);
    if(!stateMap) return null;

    return (
        
            <Chart dimensions={dimensions}>
                {/* {stateMap.features.map((feature, i) => {
                    return (
                        <path
                            key={`path-${i}`}
                           
                        />
                    );
                })} */}
            </Chart>
        
    )
};
