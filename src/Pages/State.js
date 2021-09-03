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

            { data === null ? <p>loading</p> : 
                <Flex 
                    backgroundColor="white"
                    p={4}
                >
                 <Box>
                    <Text>Daily new cases</Text>
                    <Text fontSize="xl">
                        {data.caseDensity}
                    </Text>
                 </Box>
                </Flex>
            }

        </Container>
    </Box> 

     );
}
 
export default State;