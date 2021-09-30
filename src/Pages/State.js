import React, { useEffect, useState } from 'react';
import { Container, Text, Flex, Box, Skeleton } from '@chakra-ui/react';
import { riskLevelCaseDensity, riskLevelInfectionRate, riskLevelPositiveRate } from '../utils/riskLevel';
import { useLocation } from 'react-router-dom';
import RiskLegend from '../components/legend/RiskLegend';

const State = ({ state }) => {
    let { pathname } = useLocation();
    let [ data, setData ] = useState(null);

    useEffect(() => {
        fetch(`https://api.covidactnow.org/v2/state/${state}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
        .then(response => response.json())
        .then(response => {
            let metrics = response.metrics;
            setData(metrics);
        })
    }, [state]);

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
                    flexDirection='column'
                >
                <RiskLegend riskNumber={3}/>
                <Box d="flex" flexDirection={['column', 'row', 'row', 'row']}>
                    <StatBox 
                        statTitle="Daily New Cases"
                        statData={data.caseDensity}
                        riskLevel={riskLevelCaseDensity}
                    />
                    <StatBox 
                        statTitle="Infection Rate"
                        statData={data.infectionRate}
                        riskLevel={riskLevelInfectionRate}
                    />
                    <StatBox
                        statTitle="Positive Test Rate"
                        statData={data.testPositivityRatio}
                        riskLevel={riskLevelPositiveRate}
                    />
                    <StatBox
                        statTitle="% Vaccinated"
                        statData={data.vaccinationsInitiatedRatio}
                    />
                 </Box>
                </Flex>
            }
        </Container>
    </Box> 

     );
}

const StatBox = ({ statTitle, statData, riskLevel }) => {
   let data = statTitle === 'Positive Test Rate' || statTitle === '% Vaccinated' 
            ? statData * 100 : statData;
   return( 
    <Box padding={2} ml={4}>
        <Text fontWeight="bold" fontSize="1xl">{statTitle}</Text>
        <Box d="flex" alignItems="center">
            <Box 
                bg={`${statTitle === '% Vaccinated' ? '' : riskLevel(statData)}`}
                w="10px"
                h="10px"
                borderRadius={50}
                // mt="15px"
                mr="5px"
            />
        <Text fontSize="4xl">{data}</Text>
        </Box>
    </Box>
   )
};
 
export default State;