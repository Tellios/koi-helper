import { create } from 'zustand';

export interface IAppProgressState {
  open: boolean;
  currentCount: number;
  totalCount: number;
  message: string;
  mode: 'count' | 'indeterminate';
  progressAction: { actionId: string; label: string; disabled: boolean };
  showProgress: (
    options: Partial<Pick<IAppProgressState, 'currentCount' | 'message' | 'totalCount' | 'mode'>>,
  ) => void;
  setProgressAction: (action: IAppProgressState['progressAction']) => void;
  hideProgress: () => void;
}

export const useAppProgressStore = create<IAppProgressState>((set) => {
  return {
    open: false,
    currentCount: 0,
    totalCount: 0,
    message: '',
    mode: 'indeterminate',
    progressAction: { actionId: '', label: '', disabled: true },
    showProgress: (options) => {
      set((state) => ({ ...state, ...options, open: true }));
    },
    setProgressAction: (action) => {
      set((state) => ({ ...state, progressAction: { ...state.progressAction, ...action } }));
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
