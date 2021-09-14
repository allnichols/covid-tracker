import React, { useEffect, useState } from 'react';
import { Container, Text, Flex, Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const State = ({ state }) => {
    let { pathname } = useLocation();
    let [ data, setData ] = useState(null);

    useEffect(() => {
        fetch(`https://api.covidactnow.org/v2/state/${state}.json?apiKey=${process.env.REACT_APP_API_ENDPOINT_KEY}`)
        .then(response => response.json())
        .then(response => {
            let metrics = response.metrics;
            setData(metrics);
        })
    }, []);

    return (
        <Box backgroundColor="rgb(250, 250, 250)" pb={4}>
          <Container maxW="container.lg">
            <Text
            as="h1"
            textTransform="capitalize"
            fontWeight="bold"
            fontSize="2rem">
                {pathname.replace('/', '')}
            </Text>

            { data === null ? 
                <Skeleton height="50px" width="100%"/>
                 : 
                <Flex 
                    backgroundColor="white"
                    p={4}
                    flexDirection={['column', 'row', 'row', 'row']}
                >
                 
                 <StatBox 
                    statTitle="Daily new cases"
                    statData={data.caseDensity} />
                <StatBox 
                    statTitle="Infection Rate"
                    statData={data.infectionRate } />

                </Flex>
            }

        </Container>
    </Box> 

     );
}

const StatBox = ({ statTitle, statData }) => (
    <Box padding={2}>
        <Text fontWeight="bold">{statTitle}</Text>
        <Text fontSize="3xl">{statData}</Text>
    </Box>
);
 
export default State;