import React, { useEffect, useReducer } from 'react';
import { Container, Text, Flex, Box, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


const State = ({ state }) => {
    let { pathname } = useLocation();

    useEffect(() => {
        fetch(`https://api.covidactnow.org/v2/state/${state}.json?apiKey=${process.env.REACT_APP_API_ENDPOINT_KEY}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
    }, []);

    return ( 
        <Container maxW="container.lg">
            <Text
            as="h1"
            textTransform="capitalize"
            fontWeight="bold"
            fontSize="2rem">
                
                {pathname.replace('/', '')}
            </Text>

        </Container>
     );
}
 
export default State;