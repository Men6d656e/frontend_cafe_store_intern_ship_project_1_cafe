import { create } from "zustand";

export interface Role {
  role: string | null;
  setRole: (newRole: string | null) => void;
  clearRole: () => void;
}

// fetch role
const getTheinitialState = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      const userRole = localStorage.getItem("role");
      return userRole !== null ? userRole : null;
    } catch (error) {
      console.error("Failed to read role from localStorage: ", error);
      return null;
    }
  }
  return null;
};

export const userRole = create<Role>((set) => ({
  role: getTheinitialState(),

  setRole: (newRole) => {
    if (typeof window !== "undefined") {
      try {
        if (newRole !== null) {
          localStorage.setItem("role", newRole);
        } else {
          localStorage.removeItem("role");
        }
        set({ role: newRole });
      } catch (error) {
        console.error("Fail to write role in localStorage", error);
      }
    }
  },
  clearRole: () => {
    localStorage.clear();
    set({ role: null });
  },
}));
