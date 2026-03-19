import { create } from 'zustand';

export interface IAppProgressState {
  open: boolean;
  currentCount: number;
  totalCount: number;
  message: string;
  mode: 'count' | 'indeterminate';
  showProgress: (
    options: Partial<Pick<IAppProgressState, 'currentCount' | 'message' | 'totalCount' | 'mode'>>,
  ) => void;
  hideProgress: () => void;
}

export const useAppProgressStore = create<IAppProgressState>((set) => {
  return {
    open: false,
    currentCount: 0,
    totalCount: 0,
    message: '',
    mode: 'indeterminate',
    showProgress: (options) => {
      set((state) => ({ ...state, ...options, open: true }));
    },
    hideProgress: () => {
      set((state) => ({
        ...state,
        open: false,
        currentCount: 0,
        totalCount: 0,
        message: '',
        mode: 'indeterminate',
      }));
    },
  };
});
