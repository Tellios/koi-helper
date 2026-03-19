import { create } from 'zustand';

export const useMainMenuStore = create<{
  appMenuOpen: boolean;
  toggleAppMenuOpen: () => void;
}>((set) => {
  return {
    appMenuOpen: false,
    toggleAppMenuOpen: () => {
      set((state) => ({ appMenuOpen: !state.appMenuOpen }));
    },
  };
});
