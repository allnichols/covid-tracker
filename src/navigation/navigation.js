import React from "react";
import { Flex, Box, Heading, Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import USA from "../Pages/USA";
import States from "../Pages/States";
import State from "../Pages/State";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Flex as="nav" justify="space-between" alignItems="center">
          <Box mr="16px">
            <NavLink to="/">USA</NavLink>
          </Box>
          <Box mr="16px">
            <NavLink to="/states">States</NavLink>
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
        <Route exact path="/states">
          <States />
        </Route>
        <Route path="/:state">
          <State/>
        </Route>
      </Switch>
      </>
  );
};

export default Header;
