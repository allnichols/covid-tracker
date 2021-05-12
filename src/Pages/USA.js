import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from '@chakra-ui/react';

import SearchBar from '../components/search/SearchBar';
import Map from '../components/map/Map';

const USA = () => {
    const [data, setData] = useState({});


    // useEffect(() => {
    //     fetch(`https://api.covidactnow.org/v2/counties.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
    //         .then(res => res.json())
    //         .then(
    //             result => {
    //                 console.log(result);
    //             }, 
    //             error => {
    //                 console.log(error);
    //             }
    //         )
    // }, []);

    return ( 
        <Container centerContent marginTop="24px">
            <SearchBar />
            <Map />
        </Container>
     );
}
 
export default USA;
