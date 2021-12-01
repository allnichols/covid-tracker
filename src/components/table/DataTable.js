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
  const [data, setData] = useState([]);

  useEffect(() => {
    // map every url to the promise of the fetch
    let requests = urls.map(url => fetch(url));
    // Promise.all waits until all jobs are resolved
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        let states = data[0]
        let counties = data[1]
        console.log(states)
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

      <Table variant="striped">

      </Table>
    </>
  );
}

export default DataTable;