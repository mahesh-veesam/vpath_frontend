import React, { useState , useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore';
import { axiosInstance } from '@/utils/axios';
import { Flex , Button, Input, HStack , Card, Heading ,SimpleGrid, Box , InputGroup , Text , Spinner } from "@chakra-ui/react"

const Admin = () => {

    const {authUser} = useAuthStore()
    const [users,setUsers] = useState()
    const [totalUsers,setTotalUsers] = useState(0)
    const [filterUsers , setFilterUsers] = useState("")

    console.log(authUser)

    let getData = async () =>{
        try{
            let res = await axiosInstance.get("users/showUsersData")
            let usersData = res.data.users
            let totalUserCount = res.data.totalUsers
            console.log(usersData)
            setUsers(usersData)
            setTotalUsers(totalUserCount)
        }catch(e){
            console.log(e)
        }   
    }

    useEffect (()=> {
        if(!users) getData()
    },[])

    if(!authUser || authUser.email !== "mahesh.23mis7302@vitapstudent.ac.in"){
        return (
            <Text fontWeight={600} fontSize={20} textAlign={"center"} mt={"50%"}>ACCESS DENIED</Text>
        )
    }

    if(!users) return <div>Loading</div>

    return (
        <Box mx="5%" my="2%">
            <Text mx={"5%"} fontWeight={600} fontSize={18} mb="2"> Total Users : {totalUsers}</Text>
            <Box m={"5"}>
                <InputGroup>
                    <Input
                        placeholder="Search Users"
                        borderRadius="10px"
                        value={filterUsers}
                        onChange={(e)=>setFilterUsers(e.target.value)}
                    />
                </InputGroup>
            </Box>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={1}>
            {users
                .filter(u =>
                    u.name.toLowerCase().includes(filterUsers.toLowerCase()) ||
                    u.email.toLowerCase().includes(filterUsers.toLowerCase())
                )
                .map((user,i) => (
                <Card.Root
                    size="sm"
                    m="2"
                    key={user.email}
                >
                    <Card.Body>
                        <Heading size="lg">{i+1}. {user.name}</Heading>
                        <Text  fontWeight={600} fontSize={14} color={"gray.200"} mt={"3"}>{user.email}</Text>
                        <Text mt={"3"} fontWeight={600} fontSize={13} color={"gray.300"}>
                            Created At :{" "}
                            {new Date(user.createdAt).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </Text>
                    </Card.Body>
                </Card.Root>
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default Admin
