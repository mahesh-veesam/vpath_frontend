import { useState } from "react"
import {
  Box,
  Heading,
  VStack,
  HStack,
  NumberInput,
  Button,
  Select,
  Text,
  createListCollection,
  Portal
} from "@chakra-ui/react"

const GpaCalc = () => {
  const [courses, setCourses] = useState([{ credits: "", grade: "" },{ credits: "", grade: "" },{ credits: "", grade: "" },{ credits: "", grade: "" },{ credits: "", grade: "" },{ credits: "", grade: "" }])
  const [gpa, setGpa] = useState(null)

  // Add a new course row
  const addCourse = () => {
    setCourses([...courses, { credits: "", grade: "" }])
  }

  // Handle field change
  const handleChange = (index, field, value) => {
    const newCourses = [...courses]
    newCourses[index][field] = value
    setCourses(newCourses)
  }

  // Calculate GPA
  const calculateGPA = () => {
    let totalCredits = 0
    let weighted = 0

    courses.forEach((c) => {
      if (c.credits && c.grade) {
        totalCredits += parseFloat(c.credits)
        weighted += parseFloat(c.credits) * parseFloat(c.grade)
      }
    })

    if (totalCredits > 0) {
      setGpa((weighted / totalCredits).toFixed(2))
    } else {
      setGpa("N/A")
    }
  }

  return (
    <Box p={6}>
      <Heading textAlign="center" mb={6}>
        GPA Calculator
      </Heading>
      <VStack spacing={4} justifyContent="center" alignItems="center">
        {courses.map((c, i) => (
          <HStack 
              key={i} 
              spacing={3} 
              justifyContent="center" 
              alignItems="center"
            >
              {/* Credits Select */}
              <Select.Root
                collection={credits}
                size="md"
                width="150px"
                value={c.credits}
                onValueChange={(e) => handleChange(i, "credits", e.value)}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    borderRadius="16px"
                  >
                    <Select.ValueText placeholder="Select Credits" color="white" />
                  </Select.Trigger>
                  <Select.IndicatorGroup />
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {credits.items.map((c) => (
                        <Select.Item item={c} key={c.value}>
                          {c.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              {/* Grade Select */}
              <Select.Root
                collection={grades}
                size="md"
                width="150px"
                value={c.grade}
                onValueChange={(e) => handleChange(i, "grade", e.value)}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    borderRadius="16px"
                  >
                    <Select.ValueText placeholder="Select Grade" color="white" />
                  </Select.Trigger>
                  <Select.IndicatorGroup />
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {grades.items.map((g) => (
                        <Select.Item item={g} key={g.value}>
                          {g.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </HStack>

        ))}

        <HStack mt={5}>
          <Button onClick={addCourse} colorScheme="teal" borderRadius="18px" px={5}>
            + Add Course
          </Button>
          <Button onClick={calculateGPA} colorScheme="blue" borderRadius="18px" px={5}>
            Calculate GPA
          </Button>
        </HStack>

        {gpa && (
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={gpa < 8 ? "red.400" : gpa >= 9 ? "green.400" : "orange.400"}
          >
            GPA: {gpa}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

const credits = createListCollection({
 items : [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "8", value: 8 },
]
}) 

const grades = createListCollection({
 items : [
    { label: "S", value: 10 },
    { label: "A", value: 9 },
    { label: "B", value: 8 },
    { label: "C", value: 7 },
    { label: "D", value: 6 },
    { label: "E", value: 5 },
    { label: "F", value: 0 },
]
})  


export default GpaCalc