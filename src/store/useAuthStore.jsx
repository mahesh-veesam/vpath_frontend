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
      const authTab = window.open(
        "https://vpath.onrender.com/auth/google",
        "_blank",
        "noopener,noreferrer"
      );

      if (!authTab) {
        toaster.create({
          description: "Popup blocked. Allow popups to login.",
          type: "warning",
        });
        return;
      }

      // 🔁 Wait until user closes OAuth tab
      const timer = setInterval(() => {
        if (authTab.closed) {
          clearInterval(timer);
          get().checkAuth();
        }
      }, 800);
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