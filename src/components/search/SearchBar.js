import React, { useEffect, useState } from 'react';
import { InputGroup, Input, InputRightElement, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchItem from './searchItem'

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
           return false;
         })
       )
     }
  }, [search, options])

    return ( 
    <Box width="70%">
      <InputGroup>
        <Input
         placeholder="Search States"
         _placeholder={{color: 'black'}}
         color="black"
         padding="24px"
         borderRadius="99px"
         onChange={(e) => setSearch(e.target.value)} />
        <InputRightElement children={<SearchIcon marginTop="12px" marginRight="16px" />} />
      </InputGroup>
    <Box 
      w="100%"
      overflowY="scroll"
      maxHeight="400px"
      display="flex"
      flexDirection="column">
      {filtered.map( item => {
        let stateName = item.url.replaceAll('https://covidactnow.org/us/', '').replaceAll('_', ' ').replaceAll('-', ' ');
        let stateAbbreviation = item.state;
        let riskLevelNum = item.riskLevels.overall;
        let population = item.population;
        let fips = item.fips;
        
        return (
          <SearchItem 
           key={item.url}
           stateName={stateName} 
           fips={fips}
           riskLevel={riskLevelNum} 
           population={population}
           stateAbbreviation={stateAbbreviation} 
           />
          )
      })}
      </Box>
    </Box>
     );
}
 
export default SearchBar;

