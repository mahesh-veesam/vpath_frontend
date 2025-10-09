// import {
//   Box,
//   SimpleGrid, Card , HStack , Heading, Badge , Button , Image , Text,
//   Strong
// } from "@chakra-ui/react";
// import RatingCard from "@/components/RatingCard";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// function FacultyInfo() {
//   const [faculties, setFaculties] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://192.168.1.36:5000/faculty').then(res => setFaculties(res.data.faculties));
//   }, []);

//   console.log(faculties)

//   return (

//     <Box p={["2","6"]}>
//     <SimpleGrid columns={{ base: 2, md: 2, lg:2 }} spacing={1} mx={["0%","2%"]} my={["1%","1%"]} >
//     {faculties.map((d) => (
//           <Card.Root flexDirection={["column","column","row"]} alignItems="center" overflow="hidden" maxW="lg" m={["2","5"]}>
//           <Image
//             objectFit="fill"
//             maxW="200px"
//             maxH="200px"
//             width={["20","auto"]}
//             src={d.photoUrl}
//             alt="Caffe Latte"
//             borderRadius={["50%","16px"]}  mt={["5","0"]} ml={[0,2]}
//           />
//           <Box>
//             <Card.Body>
//               <Card.Title fontSize={["sm","md"]}>{d.name}</Card.Title>
//               <Card.Description fontSize={["sm","md"]}>
//                   {d.school}
//               </Card.Description>
//               <Card.Description fontWeight="500" fontSize={["sm","md"]}>
//                 <Strong color="rgb(219, 217, 217,0.9)">Cabin No :</Strong>  {d.cabin}
//               </Card.Description>
//             </Card.Body>
//             <Card.Footer mt={0}>
//               <Button variant="subtle" >View More</Button>
//             </Card.Footer>
//           </Box>
//         </Card.Root>
//   ))}
//     </SimpleGrid>
//     <RatingCard/>
//   </Box>
//   );
// }

// export default FacultyInfo;