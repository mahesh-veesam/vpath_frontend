import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { useLocation , Outlet } from 'react-router-dom'
import { initGA , logPageView } from "./analytics/ga";
import { useAuthStore } from "./store/useAuthStore";
import { Box } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"

function App() {  
  const {checkAuth ,authUser, setAuthUser} = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);
  
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    if (user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));

        console.log(`Hi, ${userData.name}`);
        setAuthUser(userData);

        toaster.create({
          description: `Hi, ${userData.name}`,
          type: "info",
        })

        localStorage.setItem("authUser", JSON.stringify(userData));

        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error("Error parsing user data", err);
        toaster.create({
          description: `Use college mail to login`,
          type: "warning",
        })
      }
    } else {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        setAuthUser(JSON.parse(savedUser));
      }
    }
  }, []);

  return (
    <Box mb="20px">
      <Toaster />
      <Navbar/>
      <Outlet/>
    </Box>
  )
}

export default App
