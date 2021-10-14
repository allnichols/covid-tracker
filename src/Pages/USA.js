import React from 'react';
import { Container, Heading } from '@chakra-ui/react';

import SearchBar from '../components/search/SearchBar';
import Map from '../components/map/Map';
import MapLegend from '../components/map/Legend';
import { useData } from '../components/map/useData';

const USA = () => {
    const data = useData()
    
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
