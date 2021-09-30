import React from 'react';
import { Box, Text } from "@chakra-ui/react";

// change this to map legend and put in legend folder
const MapLegend = () => {
    return ( 
        <Box d="flex">
            <Text mr="6px"><strong>Low</strong> Risk</Text>
            <Box bg="#00d474" w="25px" borderRadius="99px 0px 0px 99px"></Box>
            <Box bg="#ffc900" w="25px"></Box>
            <Box bg="#ff9600" w="25px"></Box>
            <Box bg="#d9002c" w="25px"></Box>
            <Box bg="#790019" w="25px" borderRadius="0px 99px 99px 0px"></Box>
            <Text ml="6px"><strong>Severe</strong> Risk</Text>
        </Box>
     );
}
 
export default MapLegend;