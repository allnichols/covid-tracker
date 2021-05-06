import React from 'react';
import { Text, Flex, Box, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const State = () => {
    let { pathname } = useLocation();
    
    return ( 
        <div>
            <Text
            as="h1"
            textTransform="capitalize"
            fontWeight="bold"
            fontSize="2rem">
                {pathname.replace('/', '')}
            </Text>
        </div>
     );
}
 
export default State;