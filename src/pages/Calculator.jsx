import CgpaCalc from '@/components/CgpaCalc'
import GpaCalc from '@/components/GpaCalc'
import React from 'react'
import { Link, Tabs } from "@chakra-ui/react"
import { useEffect } from 'react'

const Calculator = () => {

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div>
      <Tabs.Root lazyMount defaultValue="tab-1" alignItems="center">
        <Tabs.List width={["80%","50%"]} mx="auto" display="flex" justifyContent="space-around">
          <Tabs.Trigger value="tab-1">GPA Calculator</Tabs.Trigger>
          <Tabs.Trigger value="tab-2">CGPA Calculator</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          <GpaCalc/>
        </Tabs.Content>
        <Tabs.Content value="tab-2">
          <CgpaCalc/>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}


export default Calculator
