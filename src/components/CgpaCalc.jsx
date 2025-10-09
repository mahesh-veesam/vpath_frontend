import { useState } from "react"
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  NumberInput,
} from "@chakra-ui/react"

const CgpaCalc = () => {
  const [courses, setCourses] = useState([{ credits: "", grade: "" },{ credits: "", grade: "" }])
  const [cgpa, setCgpa] = useState(null)
  const [totalCredits, setTotalCredits] = useState(0)

  // Add a new course row
  const addCourse = () => {
    setCourses([...courses, { credits: "", grade: "" }])
  }

  // Handle change
  const handleChange = (index, field, value) => {
    const newCourses = [...courses]
    newCourses[index][field] = value
    setCourses(newCourses)
  }

  // Calculate CGPA
  const calculateCGPA = () => {
    let totalCreditsCalc = 0
    let weighted = 0

    courses.forEach((c) => {
      const grade = parseFloat(c.grade)
      const credits = parseFloat(c.credits)

      if (!isNaN(grade) && !isNaN(credits)) {
        totalCreditsCalc += credits
        weighted += credits * grade
      }
    })

    setTotalCredits(totalCreditsCalc)

    if (totalCreditsCalc > 0) {
      setCgpa((weighted / totalCreditsCalc).toFixed(2))
    } else {
      setCgpa("N/A")
    }
  }

  return (
    <Box p={6}>
      <Heading textAlign="center" mb={6}>
        CGPA Calculator
      </Heading>

      <VStack spacing={4}>
        {courses.map((c, i) => (
         <HStack 
            key={i} 
            spacing={4} 
            justifyContent="center" 
            alignItems="center" 
            w="100%"
          >
            {/* Grade Input (0–10) */}
            <NumberInput.Root
              min={0}
              max={10}
              step={0.1}
              value={c.grade}
              onValueChange={(e) => handleChange(i, "grade", e.value)}
              width="200px"
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder="GPA (0-10)" borderRadius="12px"/>
            </NumberInput.Root>

            {/* Credits Input */}
            <NumberInput.Root
              min={0}
              max={27}
              value={c.credits}
              onValueChange={(e) => handleChange(i, "credits", e.value)}
              width="200px"
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder="Credits" borderRadius="12px"/>
            </NumberInput.Root>
          </HStack>

        ))}

        <HStack mt={5}>
          <Button onClick={addCourse} colorScheme="teal" borderRadius="18px" px={5}>
            + Add Sem
          </Button>

          <Button onClick={calculateCGPA} colorScheme="blue" borderRadius="18px" px={5}>
            Calculate
          </Button>
        </HStack>

        {cgpa && (
          <Box mt={5}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={cgpa < 7 ? "red.400" : cgpa >= 9 ? "green.400" : "orange.400"}
            >
              CGPA: {cgpa}
            </Text>
            <Text fontSize="lg" fontWeight="medium" color="gray.300">
              Total Credits Completed: {totalCredits}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default CgpaCalc