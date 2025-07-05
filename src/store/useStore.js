import { create } from "zustand";
import { v4 as uuid } from "uuid";

export const useStore = create((set) => ({
  windows: [],
  zIndexCounter: 10,

  openApp: (title) =>
    set((state) => {
      const id = uuid();
      const newWindow = {
        id,
        title,
        isMinimized: false,
        isMaximized: title === "Cook" || title === "EdexUI",
        zIndex: state.zIndexCounter,
      };
      return {
        windows: [...state.windows, newWindow],
        zIndexCounter: state.zIndexCounter + 1,
      };
    }),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, zIndex: state.zIndexCounter } : win
      ),
      zIndexCounter: state.zIndexCounter + 1,
    })),

  closeApp: (id) =>
    set((state) => ({
      windows: state.windows.filter((win) => win.id !== id),
    })),

  toggleMinimize: (id) =>
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, isMinimized: !win.isMinimized } : win
      ),
    })),

  toggleMaximize: (id) =>
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, isMaximized: !win.isMaximized } : win
      ),
    })),

  // Desktop file/folder system
  desktopItems: [],
  addDesktopItem: (item) =>
    set((state) => ({
      desktopItems: [...state.desktopItems, item],
    })),

  renameDesktopItem: (id, newName) =>
    set((state) => ({
      desktopItems: state.desktopItems.map((item) =>
        item.id === id ? { ...item, name: newName, isEditing: false } : item
      ),
    })),

  deleteDesktopItem: (id) =>
    set((state) => ({
      desktopItems: state.desktopItems.filter((item) => item.id !== id),
    })),

  isActivitiesMode: false,
  setActivitiesMode: () =>
    set((state) => ({ isActivitiesMode: !state.isActivitiesMode })),
}));
