import React from 'react'
import { useState,useEffect } from 'react'
import { useParams , Link } from 'react-router-dom';
import axios from 'axios';
import { SimpleGrid , Card , Text , Badge , Box , HStack , Button , IconButton , VStack , Spinner , Flex} from '@chakra-ui/react';
import EditForm from './EditForm';
import { useAuthStore } from '@/store/useAuthStore';
import { FaDownload } from "react-icons/fa6"
import { axiosInstance } from '@/utils/axios';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

const Coursecard = () => {
        const navigate = useNavigate()
        const { code } = useParams();
        const [data,setData] = useState([])
        const [loading,setLoading] = useState(false)
        const [course , setCourse] = useState()
        const [editForm , setEditForm] = useState(false)
        const [editData , setEditData] = useState({})
        const [isDeleting , setIsDeleting] = useState(false)

        const {authUser} = useAuthStore()
    
        let getData = async () =>{
            try{
                setLoading(true)
                    let res = await axiosInstance.get(`courses/${code}`)
                    let cdata = res.data
                    console.log(cdata)
                    setData(cdata)
                    setCourse(cdata[0].title)
                setLoading(false) 
            }catch(e){
                console.log(e)
            }   
        }

        useEffect(() => {
            if (editForm) {
            document.body.style.overflow = "hidden";
            } else {
            document.body.style.overflow = "auto";
            }
        }, [editForm]);
    
        useEffect (()=> {
            getData()
        },[])

        const handleUpdateCourse = (updatedCourse) => {
            setData((prevData) =>
                prevData.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
            );
        };

        let handleDelete = async (e)=>{
            if(isDeleting) return;
            setIsDeleting(true)
            console.log(e)
            let res = await axiosInstance.delete(`courses/delete/${e}`)
            setIsDeleting(false)
        }

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
        <Box 
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            mx={["1%","4.5%"]} mt={["0%","1%"]}
            >
            <Box
                borderRadius="full"
                onClick={() => navigate("/recentSem")}
                mr={-2}
                >
                <IconButton variant="ghost" borderRadius="26px" aria-label="Home" size="lg" fontSize="20px" pt={0.5}>
                    <IoIosArrowBack/>
                </IconButton>
            </Box>
            <VStack>
                <Text fontWeight={600} fontSize={19} zIndex={100}>{code}</Text>
            </VStack>
        </Box>
    <Text mx="6%" fontWeight={500} fontSize={16}>{course}</Text>
    <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3 }} 
        spacing={10} 
        gap={3}
        mx="5%" 
        my={["3%","1%"]}
        >
        {[...data].reverse().map((d) => (
            <Card.Root
            key={d._id}
            size="sm"
            p={5}
            borderRadius="2xl"
            boxShadow="md"
            transition="all 0.3s ease"
            >
            {/* Card Header */}
                <Box
                mb={4}
                pb={3}
                px={1}
                borderBottom="1px solid"
                borderColor="gray.200"
                _dark={{ borderColor: "gray.700" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                >
                <Box fontWeight="semibold" fontSize="lg" color="teal.600" _dark={{ color: "teal.300" }}>
                    {d.examType} 
                </Box>
                <Badge px={5} py={2} borderRadius="full" colorPalette="cyan" fontSize="sm">
                    {d.slot}
                </Badge>
                </Box>

            {/* Card Body */}
            <Box fontSize="sm" mb={2}>
                <strong>Date : </strong>{" "}
                {new Date(d.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                })}
            </Box>
            <Box fontSize="sm" mb={2}>
                <strong>Uploaded By : </strong> {d.uploadedBy.email.split(".")[0].charAt(0).toUpperCase() + d.uploadedBy.email.split(".")[0].slice(1)} 
            </Box>
            <Box fontSize="sm">
                <strong>Uploaded On : </strong>{" "}
                {new Date(d.uploadedAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
                </Box>

            {/* Action Buttons */}
            
            <HStack mt={4} spacing={3}>
                
                {/* Download */}
                <Button
                as="a"
                href={d.pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                flex={1}
                colorPalette="cyan"
                variant="subtle"
                >
                    Download
                </Button>

            {(authUser?.email === d.uploadedBy.email || authUser?.email == "mahesh.23mis7302@vitapstudent.ac.in")  && (
                <>
                <Button
                flex={1}
                colorPalette="grey"
                variant="subtle"
                onClick={() => (setEditForm(!editForm), setEditData(d))}
                >
                    Edit
                </Button>

                <Button
                flex={1}
                colorPalette="red"
                variant="subtle"
                onClick={() => handleDelete(d._id) }
                >
                    {!isDeleting ? "Delete" : "Deleting"}
                </Button>
                </> 
                ) }
            </HStack>
            </Card.Root>
        ))}
    </SimpleGrid>
    {editForm && (
        <Box pos="absolute" top="0%" left="0%">
            <EditForm data={editData} setEditForm={setEditForm} onUpdate={handleUpdateCourse} />
        </Box>
    )}
    </div>
  )
}

export default Coursecard;
