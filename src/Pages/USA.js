import React from 'react';
import { Container, Heading, Box } from '@chakra-ui/react';
import SearchBar from '../components/search/SearchBar';
import MapLegend from '../components/map/Legend';
import { UsaMap } from '../components/charts/UsaMap';
import { useChartDimensions } from '../utils/useChartDimensions';

const USA = () => {
    const [ref, dimensions] = useChartDimensions({ marginRight: 75 });
    return (
        <Container centerContent maxW="container.lg" marginTop="24px">
            <SearchBar />
            <Heading as="h2" size="xl" textAlign="center" mt="1rem">Risk Levels</Heading>
            <Box w="100%" h="500px" ref={ref}>
                <UsaMap dimensions={dimensions} />
            </Box>
            <MapLegend />
        </Container>
    );
}

export default USA;
