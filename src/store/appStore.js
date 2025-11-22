import { create } from "zustand";

const appStore = create((set) => ({
  selectedPlaceId: null,
  isSidebarOpen: false,
  currentMode: "2D",
  isDarkMode: true, // Start in Dark Mode by default (futuristic feel)

  openSidebar: (id) =>
    set({
      selectedPlaceId: id,
      isSidebarOpen: true,
    }),

  closeSidebar: () =>
    set({
      isSidebarOpen: false,
      selectedPlaceId: null,
    }),

  toggleTheme: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
}));

export default appStore;
