import React from 'react'
import {Card , SimpleGrid , Heading , HStack  } from "@chakra-ui/react"
import { IoIosPaper } from "react-icons/io";
import { LinksTab } from '@/components/LinksTab';
import btech from "@/data/btech.json"
import mtech from "@/data/mtech.json"
import cse from "@/data/cse.json"
import swe from "@/data/swe.json"
import others from "@/data/others.json"

const PyqsTab = ({branchcode}) => {
  
  const dataMap = {
    btech,
    mtech,
    cse,
    swe,
  };

  let data = dataMap[branchcode] || others;

  return (
    <div>
      <SimpleGrid columns={{ base: 1, sm : 2,  md: 3 , lg:3}} spacing={2} mx="3%" mt={["5%","2%"]} >
        {data.map((data) => (
          <Card.Root size="sm" m={3} width='95%' key={data.code}>
            <Card.Header>
              <HStack>
                <IoIosPaper/>
                <Heading size="lg">{data.code}</Heading>
              </HStack>
            </Card.Header>
            <Card.Body color="fg.muted">
              {data.title}
            </Card.Body>
            <Card.Body>
                <LinksTab code={data.code} cat1={data.cat1} cat2={data.cat2} fat={data.fat} short={data.short}/>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </div>
  )
}

export default PyqsTab
