import { Field, Input, Stack,SimpleGrid,Box,HStack, Portal, Select,createListCollection, IconButton , Button , Text} from '@chakra-ui/react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { IoChevronBack } from "react-icons/io5";

const EditForm = ({data , onUpdate , setEditForm}) => {
  const [formData, setFormData] = useState(data)

  console.log(data)

  const handleChange = (e) => {
    const { name, value, } = e.target;
    
    setFormData((prev) => ({  ...prev, [name]: value }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();

    onUpdate(formData)
    setEditForm(false)

    const payload = {
      code: formData.code,
      title: formData.title,
      slot: Array.isArray(formData.slot) ? formData.slot[0] : formData.slot,           
      examType: Array.isArray(formData.examType) ? formData.examType[0] : formData.examType,      
      date: formData.date,               
    };

    try {
      const response = await axios.patch(`http://192.168.1.34:5000/courses/update/${data._id}`, payload);
      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <Box bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(8px)" width="100vw" height="100vh" pos="fixed">
    <Box borderWidth={2} borderRadius="16px" bgColor="black" py={5} width={["90%","50%"]} pos="absolute" top={["50%","55%"]} left="50%" transform="translate(-50%, -50%)">
       <form onSubmit={handleSubmit}>
          <Stack gap="1" mx="2%" my="2%">
                  <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={1}>
                    <Box m="3">
                      <IconButton variant="subtle" size="sm" mr={5} onClick={()=> setEditForm(false)}>
                        <IoChevronBack/>
                      </IconButton>
                        Edit Course Details
                    </Box>
                    <Box m="3">
                        <Field.Root required>
                            <Field.Label>
                                Course Code
                            </Field.Label>
                            <Input placeholder="SWE1004" name="code" value={formData.code} onChange={handleChange}/>
                        </Field.Root>
                    </Box>
                    <Box m="3">
                        <Field.Root required>
                            <Field.Label>
                                Course Title
                            </Field.Label>
                            <Input placeholder="Introduction to Programming" name="title" value={formData.title} onChange={handleChange}  />
                        </Field.Root>
                    </Box> 
                  </SimpleGrid>
                  <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={1}>
                      <Box m="3">
                          <Select.Root
                              size="md"
                              collection={slots}
                              value={formData.slot}
                              onValueChange={(e) =>
                                setFormData((prev) => ({ ...prev, slot: e.value}))
                              }
                          >
                          <Select.HiddenSelect />
                          <Select.Label>Slot</Select.Label>
                          <Select.Control>
                              <Select.Trigger>
                              <Select.ValueText placeholder={formData.slot} name="slot" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                              <Select.Indicator />
                              </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                              <Select.Positioner>
                              <Select.Content>
                                  {slots.items.map((framework) => (
                                  <Select.Item item={framework} key={framework.value}>
                                      {framework.label}
                                      <Select.ItemIndicator />
                                  </Select.Item>
                                  ))}
                              </Select.Content>
                              </Select.Positioner>
                          </Portal>
                          </Select.Root>
                      </Box>
                      <Box m="3">
                          <Select.Root
                              size="md"
                              collection={exam}
                              value={formData.examType}
                              onValueChange={(e) =>
                                setFormData((prev) => ({ ...prev, examType: e.value}))
                              }
                          >
                          <Select.HiddenSelect />
                          <Select.Label>Exam</Select.Label>
                          <Select.Control>
                              <Select.Trigger>
                              <Select.ValueText placeholder={formData.examType} />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                              <Select.Indicator />
                              </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                              <Select.Positioner>
                              <Select.Content>
                                  {exam.items.map((framework) => (
                                  <Select.Item item={framework} key={framework.value}>
                                      {framework.label}
                                      <Select.ItemIndicator />
                                  </Select.Item>
                                  ))}
                              </Select.Content>
                              </Select.Positioner>
                          </Portal>
                          </Select.Root>
                      </Box> 
                      <Box m="3">
                          <Field.Root required>
                              <Field.Label>
                                  Date
                              </Field.Label>
                              <Input placeholder="data" type='date' name="date" value={formatDate(formData.date)} onChange={handleChange}/>
                          </Field.Root>
                      </Box>
                  </SimpleGrid>
                  <SimpleGrid columns={{ base: 1, lg: 1 }} maxW="100px" spacing={1} m="3" > 
                      <Button variant="subtle" size="md" maxW="sm" type='submit'>Update</Button>
                  </SimpleGrid>
              </Stack>
          </form>
    </Box>
    </Box>
  )
}

const slots = createListCollection({
  items: [
        { label: "A1", value: "A1" },
        { label: "A2", value: "A2" },
        { label: "B1", value: "B1" },
        { label: "B2", value: "B2" },
        { label: "C1", value: "C1" },
        { label: "C2", value: "C2" },
        { label: "D1", value: "D1" },
        { label: "D2", value: "D2" },
        { label: "E1", value: "E1" },
        { label: "E2", value: "E2" },
        { label: "F1", value: "F1" },
        { label: "F2", value: "F2" },
        { label: "G1", value: "G1" },
        { label: "G2", value: "G2" }
    ],
})

const exam = createListCollection({
    items: [
        { label: "CAT1", value: "CAT1" },
        { label: "CAT2", value: "CAT2" },
        { label: "FAT", value: "FAT" },
        { label: "Short Sem", value: "SHORT SEM" }
    ]
})

export default EditForm
