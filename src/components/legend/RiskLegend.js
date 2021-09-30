import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { overallRiskLevelStateLevel, riskLevelCaseDensity } from '../../utils/riskLevel';

const RiskLegend = ({ riskNumber }) => {
  let riskLevel = overallRiskLevelStateLevel(riskNumber);
  return(  
    <Box d="flex">
        <Box d="flex" flexDirection="column" mr="16px">
            <Box bg="#790019" w="15px" h="15px" borderRadius="99px 99px 0px 0px"></Box>

            <Box bg="#d9002c" w="15px" h="15px"></Box>
            <Box bg="#ff9600" w="15px" h="15px"></Box>

            <Box bg="#ffc900" w="15px" h="15px"></Box>

            <Box bg="#00d474" w="15px" h="15px" borderRadius="0px 0px 99px 99px"></Box>

        </Box>
        <Box d="flex" flexDirection="column">
            <Text>Risk Level</Text>
            <Box d="flex" flexDirection="row" alignItems="center">
                <Box 
                    bg={riskLevel.color}
                    w="10px"
                    h="10px"
                    borderRadius={50}
                    mr="8px"
                />
                <Text fontSize="3xl" fontWeight="bold">{riskLevel.text}</Text>
            </Box>
        </Box>
    </Box>
  );
}

// const riskLevel = (number) => {
    
// }

export default RiskLegend