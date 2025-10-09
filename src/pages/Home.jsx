"use client"

import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaNoteSticky , FaCalculator } from "react-icons/fa6";

function Home() {
  return (
    <Box minH="100vh" p={0} m={0}>
      <Flex
        mt={-5}
        w="95%"
        mx="auto"
        direction={{ base: "column-reverse", md: "row" }}
        justify="space-around"
        align={{ base: "center", md: "flex-start" }}
        h={{ base: "500px", md: "400px" }}
      >

        <Box
        color="white"
          px={{ base: "5%", md: "5%" }}
          pt={{ base: "2%", md: "10%" }}
          w={{ base: "95%", md: "auto" }}
        >
          <Box ml={{ md: "5%" }}>
            <Heading
              as="h1"
              display="inline"
              // bgGradient="linear(to-r, aqua, white, wheat, #b18f8f)"
              // bgClip="text"
              // color="transparent"
              fontFamily="Gentium Plus"
              fontSize={{ base: "24px", md: "40px" }}
            >
              Welcome to V PATH
            </Heading>
          </Box>

          <Box pt={{ base: "3%", md: "5%" }}>
            <Text color="white" my={2} fontSize={{ base: "md", md: "lg" }}>
              Access a wealth of Previous Year Questions from VIT-AP
            </Text>
            <Text color="white" my={2} fontSize={{ base: "md", md: "lg" }}>
              Enhance your exam preparation with a carefully curated collection of past papers
            </Text>
            <Text color="white" my={2} fontSize={{ base: "md", md: "lg" }}>
              Crafted to support your academic journey effectively.
            </Text>
          </Box>
        </Box>

        <Box>
          <Image
            src="./assets/books1.png"
            alt="Books"
            w={{ base: "280px", md: "400px" }}
            h={{ base: "250px", md: "auto" }}
          />
        </Box>
      </Flex>
      
      <Flex
        w={{ base: "85%", md: "90%" }}
        mx="auto"
        // mt={{ base: "20px", md: "50px" }}
        wrap="wrap"
        justify="space-around"
      >
        {[
          { to: "/pyqs", icon: FaNoteSticky, text1: "PYQs", text2: "For Freshers" },
          { to: "/pyqs", icon: FaNoteSticky, text1: "PYQs", text2: "For Seniors" },
          { to: "/recentSem", icon: FaNoteSticky, text1: "Recent Sem", text2: "Papers" },
          { to: "/calculator", icon: FaCalculator , text1: "GPA & CGPA", text2: "Calculator" },
        ].map((item, idx) => (
            <Flex
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              as={Link}
              key={idx}
              to={item.to}
              bgGradient="linear(to-tr, #09093b, #746ace)"
              h={{ base: "33vw", md: "150px" }}
              w={{ base: "43%", md: "180px" }}
              borderRadius="20px"
              borderWidth={1}
              _hover={{
                bgGradient: "linear(to-tr, blue, aqua)",
                transform: "scale(1.1)",
                transition: "0.6s",
              }}
              textAlign="center"
              mt="5"
            >
              <Icon as={item.icon} fontSize={{ base: "8vw", md: "40px" }} color="#d4c6d4" mt="20px" />
              <Box>
              <Text fontWeight="600" color="gray.400" fontSize={{ base: "4vw", md: "md" }}>
                {item.text1}
              </Text>
              <Text fontWeight="600" color="gray.400" fontSize={{ base: "4vw", md: "md" }}>
                {item.text2}
              </Text>
              </Box>
            </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default Home