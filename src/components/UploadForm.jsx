import { Field, Input, Stack,SimpleGrid,Box,HStack, Portal, Select,createListCollection,FileUpload, Icon , IconButton , Text , Spinner} from '@chakra-ui/react'
import { useState } from 'react'
import { LuUpload } from "react-icons/lu"
import Toggle from './Toggle'
import axios from 'axios'
import { axiosInstance } from '@/utils/axios'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

export default function UploadForm() {
    const [formData, setFormData] = useState({
        code: '',
        title: '',
        slot: '',
        examType : '',
        date: '',
        images: []
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        setFormData((prev) => ({  ...prev, [name]: type === "file" ? Array.from(files) : value }));
    };

    const [isUploading , setIsUploading] = useState(false);


 const handleSubmit = async (e) => {
  if(isUploading) return;

  e.preventDefault();
  setIsUploading(true) 

  // Create FormData object
  const data = new FormData();
  data.append('code', formData.code);
  data.append('title', formData.title);
  data.append('slot', formData.slot);
  data.append('examType', formData.examType);
  data.append('date', formData.date);

  formData.images.forEach((file, index) => {
    data.append("images", file); // backend will receive as an array
  });

    data.forEach((value, key) => {
        console.log(`${key}:`, value);  
    });

  try {
    const response = await axiosInstance.post('courses/upload', data, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('Upload success:', response.data);

    // Clear form
    setFormData({
      code: '',
      title: '',
      slot: [],
      examType: [],
      date: '',
      images: [],
    });

  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    setIsUploading(false) 
  }

};

  return (
    <div>
    <Box 
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        mx={["5%","9%"]} mt={["0%","1%"]}
        >
    <Box
        borderRadius="full"
        onClick={() => navigate("/recentSem")}
        mr={-2}
        >
        <IconButton variant="ghost" borderRadius="26px" aria-label="Home" size="xl" fontSize="20px">
            <IoIosArrowBack/>
        </IconButton>
    </Box>
    <HStack>
        <Text fontSize={19} fontWeight={600} zIndex={100}>Upload Question Paper</Text>
    </HStack>
    </Box>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <Stack gap="1" mx={["7%","10%"]} my="2%">
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={1}>
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
                            <Select.ValueText placeholder="Choose Slot" name="slot" />
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
                            <Select.ValueText placeholder="Choose Exam" />
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
                            <Input placeholder="" type='date' name="date" value={formData.date} onChange={handleChange}/>
                        </Field.Root>
                    </Box>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={1} mt="3"> 
                    <Box m="3">
                        <FileUpload.Root maxW="xxl" w="100%" alignItems="stretch" maxFiles={4}>
                            <FileUpload.HiddenInput type='file' name="images" value={formData.image} onChange={handleChange}  />
                            <HStack spacing="4" alignItems="stretch" w="85%">
                                <FileUpload.Dropzone p="4" maxW="xl" flex="9">
                                <Icon size="md" color="fg.muted"> 
                                    <LuUpload />
                                </Icon>
                                <FileUpload.DropzoneContent>
                                    <Box>Drag and drop files here</Box>
                                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                                </FileUpload.DropzoneContent>
                                </FileUpload.Dropzone>
                                <FileUpload.List  flex="8" showSize clearable />
                            </HStack>
                        </FileUpload.Root>
                    </Box> 
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, lg: 1 }} maxW="120px" spacing={1} m="3" > 
                <IconButton variant="subtle" borderWidth="1px" borderRadius="16px" px={3} aria-label="Home" size="md" type="submit" isDisabled={isUploading}>  
                    {!isUploading ? <Text fontSize={14} ml={1}>Upload</Text> : <Text fontSize={14} ml={1}>Uploading</Text>}
                    {isUploading && <Spinner size="xs" /> }
                </IconButton>
                </SimpleGrid>
        </Stack>
    </form>
    </div>
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