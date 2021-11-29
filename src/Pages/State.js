import React, { useEffect, useState } from 'react';
import { Container, Text, Grid, GridItem, Flex, Box, Skeleton, Progress } from '@chakra-ui/react';
import { riskLevelCaseDensity, riskLevelInfectionRate, riskLevelPositiveRate } from '../utils/riskLevel';
import { useParams } from 'react-router-dom';
import RiskLegend from '../components/legend/RiskLegend';
import StatBox from '../components/statBox/StatBox';
const State = ({ state }) => {
    const params = useParams();
    const [ data, setData ] = useState(null);
    const [currentState, setCurrentState] = useState(null);
    
    useEffect(() => {
        let stateAbbreviation = state.split('-')[1];
        fetch(`https://api.covidactnow.org/v2/state/${stateAbbreviation}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
        .then(response => response.json())
        .then(response => {
            let metrics = response.metrics;
            console.log(metrics)
            setData(metrics);
            setCurrentState(stateAbbreviation);
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
                {state.split('-')[0]}
            </Text>

            { data === null ? 
                <Skeleton height="50px" width="100%"/>
                 : 
                 <Grid 
                    templateRows={{base:"1fr 1fr", lg: "1fr"}}
                    templateColumns={{base: "1fr", lg:"repeat(6, 1fr)"}}
                    gap={2}
                    backgroundColor="white" 
                    p="16px"
                 >
                <GridItem colSpan={2} rowEnd={1}>
                    <Flex flexDirection={['column', 'row', 'row', 'row']}>
                    <RiskLegend riskNumber={3} />
                    <Box d="grid">
                        <Text>Vaccination Progress</Text>
                        <Progress w="300px" h="20px" borderRadius="4px" value={data.vaccinationsCompletedRatio * 100} />
                    </Box>
                    </Flex>
                </GridItem>
                <GridItem colSpan={4} rowEnd={2}>
                    <Box d="flex" flexDirection={['column', 'row', 'row', 'row']} mt="16px">
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
                </GridItem>
                
            </Grid>
            }
        </Container>
    </Box> 

     );
}
 
export default State;