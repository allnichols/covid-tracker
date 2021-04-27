import React, { useEffect, useState } from 'react';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  const [options, setOptions] = useState([]);


  useEffect(() => {
      getDataFromApi();
  }, []);

  const getDataFromApi = () => {
    console.log("Options Fetched from API")

      Promise.all([
        fetch(`https://api.covidactnow.org/v2/counties.json?apiKey=db851a7fa0434131ad626738b50e2c0a`),
        fetch(`https://api.covidactnow.org/v2/states.json?apiKey=db851a7fa0434131ad626738b50e2c0a`),
      ]).then( function(response){
          return Promise.all(response.map(function (response){
            return response.json();
          }));
      }).then(function (data){
          setOptions(data)
      }).catch(function (error){
          console.log(error);
      })
  }

  const search = (arr, e) => {
  //   function binarySearch(arr, elem) {
  //     var start = 0;
  //     var end = arr.length - 1;
  //     var middle = Math.floor((start + end) / 2);
  //     while(arr[middle] !== elem && start <= end) {
  //         if(elem < arr[middle]){
  //             end = middle - 1;
  //         } else {
  //             start = middle + 1;
  //         }
  //         middle = Math.floor((start + end) / 2);
  //     }
  //     if(arr[middle] === elem){
  //         return middle;
  //     }
  //     return -1;
  // }
  }
      
  

    return ( 
      <InputGroup>
        <Input
         placeholder="City, county, or state"
         padding="24px"
         borderRadius="99px"
          />
        <InputRightElement children={<SearchIcon marginTop="12px" marginRight="16px" />} />
      </InputGroup>
     );
}
 
export default SearchBar;