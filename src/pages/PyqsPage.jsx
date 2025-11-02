import React , {useState} from 'react'
import Select from '@/components/SelectPyq'
import {Flex,Alert,Box,CloseButton} from '@chakra-ui/react'
import { useParams, useNavigate , Outlet , Link } from 'react-router-dom'

const PyqsPage = () => {
  const { batch } = useParams();
   const [showAlert, setShowAlert] = useState(true);
    
  return (
    <div>
      <Flex justify="center" fontWeight="600" fontSize={20} mt={1}>Question Papers</Flex>
      <Box mx={["10%","29%"]} mt={5}>
      {showAlert && (
      <Alert.Root
        size="md" colorPalette="teal"
        borderStartWidth="3px"
        borderStartColor="colorPalette.solid"
        alignItems="center"
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
      <Select batch={batch}/>
    </div>  
  )
}


export default PyqsPage
