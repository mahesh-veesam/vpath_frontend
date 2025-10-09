import { useState } from "react";
import { CloseButton, Drawer, Portal, IconButton, Stack, Box , Button } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom"; // <-- Import Link
import { LuUser, LuFolder, LuSquareCheck, LuCalculator, LuUsers } from "react-icons/lu"   
import { GoHomeFill } from "react-icons/go";
import { useAuthStore } from "@/store/useAuthStore";
import Theme from "./Theme";

function Menu() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const {authUser, login, isLoggingIn, logout} = useAuthStore();

  const handleClick= async (e) => {
      authUser === null ? login() : logout() 
  };

  return (
    <Drawer.Root
      placement="start"
      hideFrom="lg"
      open={open}
      onOpenChange={setOpen}
    >
      <Drawer.Trigger asChild>
        <IconButton
          aria-label="Open menu"
          size="md"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <LuMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="3">
          <Drawer.Content rounded="xl" roundedBottom="l3">
            <Drawer.Header>
              <Drawer.Title>VPath</Drawer.Title>
              <CloseButton size="md" onClick={handleClose} />
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap={3} fontSize={15} mt="6" mx={0}>
                <Box
                  p={3}
                  _hover={{
                    bg: "gray.800",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                  _active={{
                    bg: "gray.700",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                >
                  <Link to="/home" onClick={handleClose} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <GoHomeFill />
                    <span style={{ marginLeft: 8 }}>Home</span>
                  </Link>
                </Box>

                <Box
                  p={3}
                  _hover={{
                    bg: "gray.800",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                  _active={{
                    bg: "gray.700",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                >
                  <Link to="/pyqs/freshers" onClick={handleClose} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <LuFolder />
                    <span style={{ marginLeft: 8 }}>PYQs</span>
                  </Link>
                </Box>

                <Box
                  p={3}
                  _hover={{
                    bg: "gray.800",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                  _active={{
                    bg: "gray.700",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                >
                  <Link to="/recentSem" onClick={handleClose} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <LuSquareCheck />
                    <span style={{ marginLeft: 8 }}>Recent Sem</span>
                  </Link>
                </Box>

                <Box
                  p={3}
                  _hover={{
                    bg: "gray.800",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                  _active={{
                    bg: "gray.700",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                >
                  <Link to="/calculator" onClick={handleClose} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <LuCalculator />
                    <span style={{ marginLeft: 8 }}>Calculator</span>
                  </Link>
                </Box>

                {/* <Box
                  p={3}
                  _hover={{
                    bg: "gray.800",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                  _active={{
                    bg: "gray.700",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "md",
                  }}
                >
                  <Link to="/communities" onClick={handleClose} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <LuUsers />
                    <span style={{ marginLeft: 8 }}>Communities</span>
                  </Link>
                </Box> */}

                {/* <Box>
                  <Theme/>
                </Box> */}

              </Stack>
            </Drawer.Body>
            <Drawer.Footer placement="start" style={{ display: "flex", justifyContent: "flex-start"}}> 
              {authUser  && 
                <Button pr="22px" mr="1px" fontSize="16px" rounded="12px" variant="subtle" onClick={handleClick}><LuUser />
                  Logout
                </Button>
              }
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

export default Menu;