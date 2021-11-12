import React from 'react';
import { Container, Heading, Box } from '@chakra-ui/react';

import SearchBar from '../components/search/SearchBar';
import Map from '../components/map/Map';
import MapLegend from '../components/map/Legend';

import { UsaMap } from '../components/charts/UsaMap';
import { useChartDimensions } from '../utils/useChartDimensions';

const USA = () => {
    const [ref, dimensions] = useChartDimensions({ marginRight: 75 });
    console.log(dimensions);
    return (
        <Container centerContent maxW="container.md" marginTop="24px">
            <SearchBar />
                <Heading as="h2" size="xl" textAlign="center" marginBottom="-35px">Risk Levels</Heading>
            <Box minW="100%" h="500px" ref={ref}>
                
                <UsaMap dimensions={dimensions}/>
                <MapLegend />
            </Box>

        </Container>
    );
}

export default USA;
