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
    checkAuth();
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
