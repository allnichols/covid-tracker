import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Button,
  ButtonGroup,
  Box
} from "@chakra-ui/react"

const urls = [
  'https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a',
  'https://api.covidactnow.org/v2/counties.json?apiKey=db851a7fa0434131ad626738b50e2c0a'
]

const DataTable = ({ isStateLevel }) => {
  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    // map every url to the promise of the fetch
    let requests = urls.map(url => fetch(url));
    // Promise.all waits until all jobs are resolved
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        let states = data[0].map(state => {
          return {
            actuals: state.actuals,
            population: state.population,
            name: state.state,
            url: state.url,
            fips: state.fips,
            metrics: state.metrics
          }
        });
        let counties = data[1].map(county => {
          return {
            actuals: county.actuals,
            population: county.population,
            name: county.county,
            state: county.state,
            url: county.url,
            fips: county.fips,
            metrics: county.metrics
          }
        });
        console.log(states)
        setStates(states);
        setCounties(counties);
      })
  }, [])

  return (
    <>
      <Box d="flex" alignContent="center" flexDirection="column">
        <ButtonGroup alignSelf="center">
          <Button colorScheme="blue" variant="outline">State</Button>
          <Button colorScheme="blue" variant="outline">County</Button>
        </ButtonGroup>
      </Box>
      <Box border="1px solid lightgrey" borderRadius="10px">
        <Table size="md">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>State Population</Th>
              <Th isNumeric>New Cases</Th>
              <Th isNumeric>Infection Rate</Th>
              <Th isNumeric>Positive Test Rate</Th>
              <Th>Vaccinated (+1 Dose)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {states.length > 0 && states.map(state => (
              <Tr key={state.fips}>
                <Td>{state.population}{state.name}</Td>
                <Td isNumeric>{state.actuals.newCases ? state.actuals.newCases : <span>Missing</span>}</Td>
                <Td isNumeric>{state.metrics.infectionRate}</Td>
                <Td isNumeric>{state.actuals.positiveTests}</Td>
                <Td>{state.actuals.vaccinationsCompleted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

    </>
  );
}

export default DataTable;