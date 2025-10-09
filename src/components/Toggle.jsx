import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import { Tabs,Flex } from "@chakra-ui/react"
import { LuFolder,LuUser } from "react-icons/lu"    

const Toggle = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = location.pathname.split("/")[2] || "home";
    console.log(currentTab)

    const handleNavigate = (e) => {
        navigate(`/${e.value}`);
    };      

  return (
    <Flex justify="center" mt={4}>
        <Tabs.Root value={currentTab} variant="plain" onValueChange={handleNavigate}>
            <Tabs.List  rounded="l3" p="1">
            <Tabs.Trigger value="recentSem">
                <LuUser />
                View
            </Tabs.Trigger>
            <Tabs.Trigger value="recentSem/upload" >
                <LuFolder />
                Upload
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
            </Tabs.List>
        </Tabs.Root>
    </Flex>
  )
}

export default Toggle
