import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toaster } from "@/components/ui/toaster"

const BASE_URL = "http://192.168.1.34:5000/courses" 

export const useAuthStore = create((set, get) => ({
  authUser: null,
  setAuthUser: (user) => {
    set({ authUser: user })
    const state = get();
    if (state.authUser) console.log(`authUser:${state.authUser.name}`)
  },

  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
      console.log("success")
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async () => {
    set({ isLoggingIn: true });
    try {   
      console.log("working")
      // window.location.href = "https://vpath.onrender.com/auth/google";
      window.open(
        "https://vpath.onrender.com/auth/google",
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      toaster.create({
        description: error?.message || "Use College mail id to login",
        type: "error",
      });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser")
      toaster.create({
        description: `Logged out successfully`,
        type: "info",
      });
    } catch (error) {
      toaster.create({
        description: error?.response?.data?.message,
        type: "error",
      });
    }
  },
}));