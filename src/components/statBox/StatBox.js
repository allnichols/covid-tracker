import React from 'react';
import { Text, Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion"

const StatBox = ({ title, statData, riskLevel }) => {
    const slideChevron = {
        hover: {
            translateX: 5
        }
    }

    let data = title === 'Positive Test Rate' || title === '% Vaccinated'
        ? `${(statData * 100).toFixed(1)}%` : statData;

    return (
        <motion.div layout initial="initial" whileHover="hover">
            <Box d="flex" flexDirection="column" alignContent="center" padding={2} mr={5} cursor="pointer">
                <Box d="flex" flexDirection="row" alignItems="center">
                    <Text fontSize="1xl" >
                        {title}
                    </Text>
                    <motion.div variants={slideChevron} transition={{ duration: .3 }}>
                        <ChevronRightIcon />
                    </motion.div>
                </Box>
                <Box d="flex" alignItems="center" alignContent="center">
                    <Box
                        bg={title === '% Vaccinated' ? '' : riskLevel(statData)}
                        w="10px"
                        h="10px"
                        borderRadius={50}
                        mr="5px"
                    />
                    <Text fontSize="4xl">{data}</Text>
                </Box>
            </Box>
        </motion.div>
    )
};

export default StatBox;