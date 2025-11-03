import { createOverlay , Dialog , Button , Portal } from "@chakra-ui/react"

const dialog = createOverlay((props) => {
  const { title, description, content, ...rest } = props
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Login</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
                <Dialog.Description>Use College mail id for login</Dialog.Description>
                <Button>Login</Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})

export default dialog