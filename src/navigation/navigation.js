import React from "react";
import { Flex, Box, Heading, Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Switch,
  Route,
  NavLink, 
  useLocation
} from "react-router-dom";

import USA from "../Pages/USA";
import State from "../Pages/State";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  let query = useQuery();

  return (
    <>
      <Flex
        justify="space-between"
        alignItems="center"
        boxShadow="rgb(0 0 0 / 5%) 0px 1px 2px 0px"
        padding="1.2rem"
      >
        <Box>
          <Heading size="md">Covid-19 Tracker</Heading>
        </Box>
        {/* Add Box here for search bar when on home page scrolled down.
            also for the search bar to start on state page
        */}
        <Flex as="nav" justify="space-between" alignItems="center">
          <Box mr="16px">
            <NavLink to="/">USA</NavLink>
          </Box>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>

      {/* Routes */}
      <Switch>
        <Route exact path="/">
          <USA />
        </Route>
        <Route path="/:state">
          <State state={query.get("state")}/>
        </Route>
      </Switch>
      </>
  );
};

export default Header;
