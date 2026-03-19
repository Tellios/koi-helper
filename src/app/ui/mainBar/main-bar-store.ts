import { create } from 'zustand';
import { IMainBarOptions } from './IMainBarOptions';

export const useMainBarStore = create<
  IMainBarOptions & { setOptions: (options: IMainBarOptions) => void }
>((set) => {
  return {
    title: '',
    showBackButton: false,
    showSettingsButton: false,
    actions: [],
    setOptions: (options: IMainBarOptions) => {
      set((state) => ({ ...state, ...options }));
    },
  };
});
