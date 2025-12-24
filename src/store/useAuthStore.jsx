import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toaster } from "@/components/ui/toaster"

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
      const prevUser = get().authUser; 

      const res = await axiosInstance.get("/auth/checkAuth");
      const user = res.data.user;

      set({ authUser: user });

      if (!prevUser && user) {
        toaster.create({
          description: `Hi, ${user.name}`,
          type: "success",
        });
      }
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
      console.log("logged out before", get().authUser);
      set({ authUser: null });
      await axiosInstance.post("/auth/logout");
      toaster.create({
        description: `Logged out successfully`,
        type: "info",
      });
    } catch (error) {
      toaster.create({
        description: error?.response?.data?.message,
        type: "error",
      });
    } finally {
      console.log("logged out", get().authUser);
    }
  },
}));