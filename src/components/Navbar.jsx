import React, { useState } from 'react'
import { Box , Button , Separator , SimpleGrid , Tabs, HStack, Flex, Image} from '@chakra-ui/react'
import { Grid, GridItem } from "@chakra-ui/react"
import { LuUser, LuFolder, LuSquareCheck, LuCalculator, LuUsers } from "react-icons/lu"   
import { GoHomeFill } from "react-icons/go";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, useLocation} from "react-router-dom"
import Menu from './Menu';
import Theme from './Theme';

const Navbar = () => {
    const {authUser, login, isLoggingIn, logout} = useAuthStore();

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick= async (e) => {
        console.log("handle")
        authUser === null ? login() : logout() 
    };

    const currentTab = location.pathname.split("/")[1] || "home";

    const handleNavigate = (e) => {
        navigate(`/${e.value}`);
    };

  return (
    <>
     <Flex
      as="nav"
      align="center"
      justify="space-between"
      px="6%" py={["38px","50px"]}
      height="60px"
      borderColor="gray.800"
      position="fixed" width="100%" zIndex="10" bg="black"
    >
      <HStack spacing={4} pt="2">
        <Image
          src="./assets/Learn_with_Ease-removebg-preview.png"
          alt="Logo"
          height="40px"
        />
      </HStack>

      {/* Tabs */}
      <HStack spacing="24px" hideBelow="lg">
            <Tabs.Root value={currentTab} variant="plain" onValueChange={handleNavigate}>
                <Tabs.List bg="bg.muted" rounded="full" p="2">
                <Tabs.Trigger value="home" p="3,5"> 
                   <GoHomeFill /> 
                    Home
                </Tabs.Trigger>
                <Tabs.Trigger value="pyqs" p="3,5">
                    <LuFolder />
                    PYQs
                </Tabs.Trigger>
                <Tabs.Trigger value="recentSem" p="3,5">
                    <LuSquareCheck />
                    Recent Sem
                </Tabs.Trigger>
                <Tabs.Trigger value="calculator" p="3,5">
                    <LuCalculator />
                    Calculator
                </Tabs.Trigger>
                {/* <Tabs.Trigger value="communities" p="3,5">
                    <LuUsers />
                    Communities
                </Tabs.Trigger> */}
                <Tabs.Indicator rounded="full" />
                </Tabs.List>
            </Tabs.Root>
      </HStack>

      <HStack spacing={4} hideBelow="lg" pt="1">
        {/* <Theme/> */}
        <Button pr="20px" mt="0" fontSize="16px" rounded="12px" variant="subtle" onClick={handleClick}><LuUser />
                {authUser === null ? "Login" : "Logout" } 
        </Button>
      </HStack>         

       <HStack hideFrom="lg">
        {!authUser &&
            <Button pr="13px" mr="10px" fontSize="14px" fontWeight={600} rounded="12px" size="xs" variant="subtle" onClick={handleClick}> <LuUser />
                Login
            </Button>
        }
            <Menu/>
        </HStack> 
        
    </Flex>
        <Box as="main" pt="100px" />
    </>
  )
}

export default Navbar
