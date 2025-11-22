import { create } from "zustand";

const appStore = create((set) => ({
  selectedPlaceId: null,
  isSidebarOpen: false,
  currentMode: "2D",

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
}));

export default appStore;
