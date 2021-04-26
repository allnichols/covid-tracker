import React, { useEffect, useState } from 'react';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
    return ( 
      <InputGroup>
        <Input
         placeholder="City, county, state, or zip"
         padding="24px"
         borderRadius="99px" />
        <InputRightElement children={<SearchIcon marginTop="12px" marginRight="16px" />} />
      </InputGroup>
     );
}
 
export default SearchBar;