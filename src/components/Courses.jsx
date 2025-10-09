import React, { useEffect, useState } from 'react'
import { Flex , Button, Input, HStack , Card, Heading ,SimpleGrid, Box , InputGroup , Text , Spinner } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { IoIosPaper } from "react-icons/io";
import { LuSearch , LuUpload } from "react-icons/lu"
import { useBreakpointValue } from "@chakra-ui/react";
import { axiosInstance } from '@/utils/axios';

const Courses = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [searchCourse , setSearchCourse] = useState("")
    const variant = useBreakpointValue({ base: "mobile", md: "desktop" });

    let getData = async () =>{
        setLoading(true)
        let res = await axiosInstance.get('courses')
        let cdata = await res.data
        setData(cdata)
        console.log(cdata)
        setLoading(false)
    }

    useEffect (()=> {
        getData()
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

            <Button
            as={Link}
            to="upload"
            pr="20px"
            mt="0"
            fontSize="14px"
            rounded="12px"
            variant="outline"
            >
            <LuUpload />
            {variant === "mobile" ? "Upload" : "Upload Question Paper"}
            </Button>
        </Flex>    
        </Box>
    </Flex>

    {/* Recent Courses */}
    {/* <Box mx="5%" my="2%">
        <Text size="md" mb="2" ml={2}>Recently Added</Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={1}>
        {data
            .filter(d => {
                const courseDate = new Date(d.uploadedAt); // use uploadedAt
                const twoWeeksAgo = new Date();
                twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // last 2 weeks

                return (
                    (d.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                    d.title.toLowerCase().includes(searchCourse.toLowerCase())) &&
                    courseDate >= twoWeeksAgo
                );
                })
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
    </Box> */}

    {/* All Courses */}
    <Box mx="5%" my="2%">
        {/* <Text size="md" mb="2">All Courses</Text> */}
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
