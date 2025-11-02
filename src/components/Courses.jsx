import React, { useEffect, useState } from 'react'
import { Flex , Button, Input, HStack , Card,Alert,CloseButton , Heading ,SimpleGrid, Box , InputGroup , Text , Spinner } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { IoIosPaper } from "react-icons/io";
import { LuSearch , LuUpload } from "react-icons/lu"
import { useBreakpointValue } from "@chakra-ui/react";
import { axiosInstance } from '@/utils/axios';

const Courses = () => {
    const [data,setData] = useState([])
    const [recent,setRecent] = useState([])
    const [loading,setLoading] = useState(false)
    const [searchCourse , setSearchCourse] = useState("")
    const variant = useBreakpointValue({ base: "mobile", md: "desktop" });
    const [showAlert, setShowAlert] = useState(true);

    const getData = async () => {
        setLoading(true);
        let res = await axiosInstance.get('courses');
        let cdata = await res.data
        setData(cdata)
        console.log(cdata)
        setLoading(false);
    }
    const getRecentData = async () => {
        setLoading(true);
        let res = await axiosInstance.get('courses/recent');
        let cdata = await res.data
        setRecent(cdata)
        console.log("resRecentData", cdata)
        setLoading(false);
    }

    useEffect (()=> {
        getData()
        getRecentData()
    },[])

    if (loading) 
    return (
        <Flex 
            justify="center" 
            align="center" 
            height="100vh" // full viewport height
        >
        <Spinner size="xl" />
        </Flex>
    );

  return (
    <div>
        <Box mx={["10%","29%"]} mb={5}>
        {showAlert && (
      <Alert.Root
        size="md" colorPalette="teal"
        borderStartWidth="3px"
        borderStartColor="colorPalette.solid"
        alignItems="center"
        // status="success"
      >
        <Alert.Title style={{ fontSize: "0.9rem" }}>
          Share your paper after the exam and contribute!{" "}
          <Link to="/recentSem/upload" style={{ color: "cyan", textDecoration: "underline" }}>
            visit recentsem/upload
          </Link>
        </Alert.Title>
        <CloseButton onClick={() => setShowAlert(false)}  pos="absolute" top="10%" insetEnd="1vw" />
      </Alert.Root>
      )}
      </Box>
    {/* Search + Upload */}
    <Flex justify="start" mx="5%" my="2%">
        <Box mx="3" w="95%" >
        <Flex justify="space-between" align="center">
            <InputGroup w="50%">
            <Input
                placeholder="Search Course"
                borderRadius="10px"
                value={searchCourse}
                onChange={(e)=>setSearchCourse(e.target.value)}
            />
            </InputGroup>

            <Button as={Link} to="upload" pr="20px" mt="0" fontSize="14px" rounded="12px" variant="outline">
                <LuUpload />
                {variant === "mobile" ? "Upload" : "Upload Question Paper"}
            </Button>
        </Flex>    
        </Box>
    </Flex>

    {(recent.length > 0) && (

    <Box mx="5%" mt={["5%","1%"]}>
        <Text fontWeight={600} fontSize={18} ml={3} mb="1">Recent Uploads</Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={1}>
            {recent.map(d => (
                <Card.Root
                    size="sm"
                    m="2"
                    key={d.code}
                    _hover={{
                        bg: "gray.800",
                        color: "white",
                        cursor: "pointer",
                        transform: "scale(1.05)",
                        transition: "all 0.5s",
                    }}
                >
                    <Link to={`course/${d.code}`}>
                        <Card.Header>
                            <HStack>
                                <IoIosPaper />
                                <Heading size="md">{d.code}</Heading>
                            </HStack>
                        </Card.Header>
                        <Card.Body color="fg.muted">{d.title}</Card.Body>
                    </Link>
                </Card.Root>
            ))}
        </SimpleGrid>
    </Box>
    )}

    <Box mx="5%" my={["5%","1%"]}>
         {(recent.length > 0) && ( <Text fontWeight={600} fontSize={18} ml={3} mb="1">All PYQs</Text> )}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={1}>
        {data
            .filter(d =>
            d.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
            d.title.toLowerCase().includes(searchCourse.toLowerCase())
            )
            .map(d => (
            <Card.Root
                size="sm"
                m="2"
                key={d.code}
                _hover={{
                bg: "gray.800",
                color: "white",
                cursor: "pointer",
                transform: "scale(1.05)",
                transition: "all 0.5s",
                }}
            >
                <Link to={`course/${d.code}`}>
                <Card.Header>
                    <HStack>
                    <IoIosPaper />
                    <Heading size="md">{d.code}</Heading>
                    </HStack>
                </Card.Header>
                <Card.Body color="fg.muted">{d.title}</Card.Body>
                </Link>
            </Card.Root>
            ))}
        </SimpleGrid>
    </Box>
    </div>
  )
}

export default Courses
