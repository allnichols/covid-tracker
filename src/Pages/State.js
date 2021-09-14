import React, { useEffect, useState } from 'react';
import { Container, Text, Flex, Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { riskLevelCaseDensity } from '../utils/riskLevel';
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
            console.log(riskLevelCaseDensity(metrics.caseDensity))
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
                 <Box padding={2}>
                    <Text fontWeight="bold">Daily new cases</Text>
                    <Box d="flex">
                        <Box 
                            bg={`${riskLevelCaseDensity(data.caseDensity)}`}
                            w={15}
                            h={15}
                            borderRadius={50}
                            mt="15px"
                            mr="5px"
                        />
                    <Text fontSize="3xl">{data.caseDensity}</Text>
                    </Box>
                </Box>
                 {/* <StatBox 
                    statTitle="Daily new cases"
                    statData={data.caseDensity}
                    riskLevel={riskLevelCaseDensity} /> */}
                <StatBox 
                    statTitle="Infection Rate"
                    statData={data.infectionRate } />

                </Flex>
            }

        </Container>
    </Box> 

     );
}

const StatBox = ({ statTitle, statData, riskLevel }) => (
    <Box padding={2}>
        <Text fontWeight="bold">{statTitle}</Text>
        <Box>
            <Box 
            // bg={`${riskLevel(statData)}`}
            w={15}
            h={15}
            borderRadius={50}
            
            />
        <Text fontSize="3xl">{statData}</Text>

        </Box>
    </Box>
);
 
export default State;