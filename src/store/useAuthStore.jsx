import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toaster } from "@/components/ui/toaster";

export const useAuthStore = create((set, get) => ({

  authUser: JSON.parse(localStorage.getItem("authUser")) || null,

  isLoggingIn: false,
  isCheckingAuth: true,
  justLoggedIn: false,

  checkAuth: async () => {
    try {
      const { justLoggedIn } = get();

      const res = await axiosInstance.get("/auth/checkAuth");
      const user = res.data.user;

      if (user) {
        set({ authUser: user });
        localStorage.setItem("authUser", JSON.stringify(user));

        if (justLoggedIn) {
          toaster.create({
            description: `Hi, ${user.name}`,
            type: "success",
          });
        }
      } else {
        set({ authUser: null });
        localStorage.removeItem("authUser");
      }

    } catch (error) {
      set({ authUser: null });
      localStorage.removeItem("authUser");

    } finally {
      set({ isCheckingAuth: false, justLoggedIn: false });
    }
  },

  login: async () => {
    set({ isLoggingIn: true, justLoggedIn: true });

    try {
      const authTab = window.open(
        "https://vpath.onrender.com/auth/google",
        "_blank",
        "noopener,noreferrer"
      );

      if (!authTab) {
        set({ justLoggedIn: false });
        toaster.create({
          description: "Popup blocked. Allow popups to login.",
          type: "warning",
        });
        return;
      }

      const timer = setInterval(() => {
        if (authTab.closed) {
          clearInterval(timer);
          get().checkAuth();
        }
      }, 800);

    } catch (error) {
      set({ justLoggedIn: false });
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
      set({ authUser: null });
      await axiosInstance.post("/auth/logout");
      toaster.create({
        description: "Logged out successfully",
        type: "info",
      });
    } catch (error) {
      toaster.create({
        description: error?.response?.data?.message,
        type: "error",
      });
    } finally {
      localStorage.removeItem("authUser");
    }
  },

}));