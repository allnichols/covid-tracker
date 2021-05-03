import React, { useEffect, useState } from 'react';
import { InputGroup, Input, InputRightElement, Text, Flex, Box, Link } from '@chakra-ui/react';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ReactRouter } from "react-router-dom";

const SearchBar = () => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
      getDataFromApi();
  }, []);

  const getDataFromApi = () => {
     
      fetch(`https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
      .then( function(response){
        return response.json()
      }).then(function (data){
        console.log(data);
          setOptions(data)
      }).catch(function (error){
          console.log(error);
      })
  }


  useEffect(() => {
     if(options.length > 0){
       setFiltered(
         options.filter( (item, i) => {
           let state = item.url.replaceAll('https://covidactnow.org/us/', '');
           
           if(search.length >= 1 && state.toLowerCase().includes( search.toLowerCase() )){
              return item;
           }
         })
       )
     }
  }, [search, options])

    return ( 
    <>
      <InputGroup>
        <Input
         placeholder="Search States"
         padding="24px"
         borderRadius="99px"
         onChange={(e) => setSearch(e.target.value)} />
        <InputRightElement children={<SearchIcon marginTop="12px" marginRight="16px" />} />
      </InputGroup>
      {filtered.map( item => {

        let stateName = item.url.replaceAll('https://covidactnow.org/us/', '')

        return (
          <Link as={ReactRouter} width="95%" to={stateName.substr(0, stateName.length - 3).replaceAll('_', ' ')}>
            <Flex 
              alignItems="center"
              marginTop="16px"
              padding="16px"
              border="1px solid #e2e8f0"
              borderRadius="20px"
              width="95%"
              justifyContent="space-between"
              key={item.state}
            >
            <Flex
              alignItems="center"
            >
              <Text marginRight="16px">
                {item.riskLevels.overall}
              </Text>
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
                Cases: {item.actuals.cases}
                </Text>

            </Flex>
              
            </Flex>
              
              <ChevronRightIcon w={25} h={25}/>
            </Flex>
          </Link>
           
          )
      })}
    </>
     );
}
 
export default SearchBar;