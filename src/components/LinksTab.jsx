import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
  Flex,
} from "@chakra-ui/react"
import { FaDownload } from "react-icons/fa6"
import { MdKeyboardArrowRight } from "react-icons/md";

export const LinksTab = ({cat1, cat2, fat, short , code}) => {
  return (
    <HStack wrap="wrap" gap="4">
          <Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
              <Button variant="outline">Get Papers <MdKeyboardArrowRight /></Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner  >
                <Dialog.Content m={10} p={3}>
                  <Dialog.Header justifyContent="center">
                    <Dialog.Title>{code}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                      <Flex justifyContent="center" flexDirection="column" gap={5}>
                        <Flex justifyContent="space-evenly">
                            <a href={cat1} target="_blank"><Button px="30px" variant="subtle">CAT1 <FaDownload/></Button></a>
                            <a href={cat2} target="_blank"><Button px="30px" variant="subtle">CAT2 <FaDownload/></Button></a>
                        </Flex> 
                        <Flex justifyContent="space-evenly">   
                            <a href={fat} target="_blank"><Button px="30px" variant="subtle"> FAT  &nbsp;<FaDownload/></Button></a> 
                            <a href={short} target="_blank"><Button px="30px" variant="subtle">Short<FaDownload/></Button></a>
                            
                        </Flex>
                    </Flex>
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
    </HStack>
  )
}
