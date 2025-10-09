import React from 'react'
import { Portal, Select , createListCollection , Box , Flex } from "@chakra-ui/react"
import { useState , useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import PyqsTab from "@/components/PyqsTab"

const SelectPyq = ({batch}) => {

  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState(batch === "freshers" || batch === "seniors" ? batch : "freshers");
  const [selectedBranchCode, setSelectedBranchCode] = useState(selectedBatch == "freshers" ? "btech" : "cse");

  useEffect(() => {
    navigate(`/pyqs/${selectedBatch}`);
    setSelectedBranchCode(()=>selectedBatch == "freshers" ? "btech" : "cse")
  }, [selectedBatch, navigate]);

  return (
    <div>
    <Flex justifyContent="space-evenly" alignItems="center" flexDirection={{base:"column", lg:"row"}} mt={3}> 
        <Box mt={5}>
        <Select.Root collection={batchOptions} size="md" width="320px" value={selectedBatch} 
            onValueChange={(e) =>
                setSelectedBatch(e.value)
            }>
        <Select.HiddenSelect />
        <Select.Label>Select Batch</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={selectedBatch == "freshers" ? "Freshers" : "Seniors"} color="white"/>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {batchOptions.items.map((batch) => (
                <Select.Item item={batch} key={batch.value}>
                  {batch.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      </Box>
      <Box mt={5}>
        <Select.Root collection={selectedBatch == "freshers" ? freshersBranch : seniorsCode} size="sm" width="320px" defaultValue={(selectedBatch == "freshers" ? freshersBranch : seniorsCode)[0]}
             onValueChange={(e) =>
                setSelectedBranchCode(e.value)
            }
        >
        <Select.HiddenSelect />
        <Select.Label>Select {selectedBatch == "freshers" ? "Branch" : "Course code"} </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={selectedBatch == "freshers" ? "BTech" : "CSE"} color="white"/>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {(selectedBatch == "freshers" ? freshersBranch : seniorsCode).items.map((fresher) => (
                <Select.Item item={fresher} key={fresher.value}>
                  {fresher.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      </Box>
    </Flex>
    <PyqsTab branchcode={selectedBranchCode}/>
    </div>
  )
}

const batchOptions = createListCollection({
 items : [
    { label: "Freshers", value: "freshers" },
    { label: "Seniors", value: "seniors" },
]
})  

const freshersBranch = createListCollection({
 items : [
    { label: "BTech", value: "btech" },
    { label: "Int. MTech", value: "mtech" },
]
})  

const seniorsCode = createListCollection({
 items : [
    { label: "CSE", value: "cse" },
    { label: "SWE", value: "swe" },
    { label: "MAT, ECE", value: "others" },
]
})  

export default SelectPyq
