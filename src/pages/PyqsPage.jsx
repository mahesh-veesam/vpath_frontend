import React from 'react'
import Select from '@/components/SelectPyq'
import {Flex} from '@chakra-ui/react'
import { useParams, useNavigate , Outlet } from 'react-router-dom'

const PyqsPage = () => {
  const { batch } = useParams();
    
  return (
    <div>
      <Flex justify="center" fontWeight="600" fontSize={20} mt={1}>Question Papers</Flex>
      <Select batch={batch}/>
      <Outlet/>
    </div>  
  )
}


export default PyqsPage
