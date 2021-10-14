import React from 'react';
import { Container, Heading } from '@chakra-ui/react';

import SearchBar from '../components/search/SearchBar';
import Map from '../components/map/Map';
import MapLegend from '../components/map/Legend';

const USA = () => {

    return ( 
        <Container centerContent maxW="container.md" marginTop="24px">
            <SearchBar />
            <Heading as="h2" size="xl" textAlign="center" marginBottom="-35px">Risk Levels</Heading>
            <Map />
            <MapLegend />
        </Container>
     );
}
 
export default USA;
