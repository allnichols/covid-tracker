import React from 'react';
import { Container } from '@chakra-ui/react';

import SearchBar from '../components/search/SearchBar';
import Map from '../components/map/Map';
import MapLegend from '../components/map/Legend';

const USA = () => {

    return ( 
        <Container centerContent maxW="container.md" marginTop="24px">
            <SearchBar />
            <Map />
            <MapLegend />
        </Container>
     );
}
 
export default USA;
