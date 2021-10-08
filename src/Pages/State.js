import React, { useEffect, useState } from 'react';
import { Container, Text, Grid, GridItem, Flex, Box, Skeleton, Progress } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion"
import { riskLevelCaseDensity, riskLevelInfectionRate, riskLevelPositiveRate } from '../utils/riskLevel';
import { useLocation } from 'react-router-dom';
import RiskLegend from '../components/legend/RiskLegend';
import Map from '../components/map/Map';
import StateMap from '../components/map/StateMap';

const State = ({ state }) => {
    let { pathname } = useLocation();
    let [ data, setData ] = useState(null);
    
    useEffect(() => {
        let stateAbbreviation = state.substring(0,2);
        fetch(`https://api.covidactnow.org/v2/state/${stateAbbreviation}.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
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
                <GridItem rowSpan={2} colSpan={{lg: 2}} alignSelf="stretch">
                    <Box h="100%" overflow="hidden" borderRadius="10px" border="1px solid grey">
                        <StateMap />
                    </Box>
                </GridItem>
            </Grid>
            }
        </Container>
    </Box> 

     );
}

const StatBox = ({ statTitle, statData, riskLevel }) => {
    const slideChevron = {
        hover: {
            translateX: 5
        }
    }
   let data = statTitle === 'Positive Test Rate' || statTitle === '% Vaccinated' 
            ? `${(statData * 100).toFixed(1)}%` : statData;
   return( 
    <motion.div layout initial="initial" whileHover="hover">
    <Box d="flex" flexDirection="column" alignContent="center" padding={2} mr={5} cursor="pointer">
       
            <Box d="flex" flexDirection="row" alignItems="center">
                <Text fontSize="1xl" >
                    {statTitle}         
                </Text>
                <motion.div variants={slideChevron} transition={{ duration: .3 }}>  
                    <ChevronRightIcon />
                </motion.div>
            </Box>
            <Box d="flex" alignItems="center" alignContent="center">
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
    </motion.div>
   )
};
 
export default State;