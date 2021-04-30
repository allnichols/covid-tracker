import React, { useEffect, useState } from 'react';
import { InputGroup, Input, InputRightElement, Text, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

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
         placeholder="City, county, or state"
         padding="24px"
         borderRadius="99px"
         onChange={(e) => setSearch(e.target.value)} />
        <InputRightElement children={<SearchIcon marginTop="12px" marginRight="16px" />} />
      </InputGroup>
      {filtered.map( item => {

        let stateName = item.url.replaceAll('https://covidactnow.org/us/', '')

        return (
            <Flex>
              <p>{item.riskLevels.overall}</p>

              <Text
                  textTransform="capitalize"
                  fontWeight="bold"
              >
                {stateName.substr(0, stateName.length - 3).replaceAll('_', ' ')}
              </Text>
            </Flex>
          )
      })}
    </>
     );
}
 
export default SearchBar;