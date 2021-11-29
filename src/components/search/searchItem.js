import React from 'react';
import { Text, Flex, Link, Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ReactRouter } from "react-router-dom";
import { motion } from 'framer-motion';

const MotionItem = motion(Flex);

const SearchItem = ({fips, stateName, riskLevel, population, stateAbbreviation}) => {

    const riskLevelCheck = (num) => {
        switch (num) {
          case 0:
            return "#00d474";
          case 1:
            return "#ffc900";
          case 2:
            return "#ff9600";
          case 3:
            return "#d9002c";
          case 4:
            return "#790019";
          default:
            break;
        
        }
      };

      const motionVariants = {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
      }
    return ( 
        <Link as={ReactRouter} width="95%" to={`${fips}?state=${stateName.substr(0, stateName.length - 3)}-${stateAbbreviation}`} key={stateAbbreviation}>
              <MotionItem 
                alignItems="center"
                marginTop="16px"
                padding="16px"
                border="1px solid #e2e8f0"
                borderRadius="20px"
                width="95%"
                justifyContent="space-between"
                initial="hidden"
                animate="visible"
                variants={motionVariants}>
                <Flex alignItems="center">
                  <Box 
                    bg={`${riskLevelCheck(riskLevel)}`} 
                    w={15} 
                    h={15} 
                    borderRadius={50}
                    marginRight="16px" />
                  <Flex
                    flexDirection="column"
                  >
                    <Text
                      textTransform="capitalize"
                      fontWeight="bold"
                      fontSize="1.125rem"
                    >
                        {stateName.substr(0, stateName.length - 3).replaceAll('_', ' ')}
                    </Text>
                    <Text>
                      {population} population
                    </Text>

                  </Flex>
                  
                </Flex>
                <ChevronRightIcon w={25} h={25}/>
              </MotionItem>
            </Link>    
     );
}


 
export default SearchItem;