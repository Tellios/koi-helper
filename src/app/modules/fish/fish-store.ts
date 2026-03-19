import { t } from '@app/i18n';
import { removeItem, replaceItem } from '@app/state';
import { useAppProgressStore } from '@app/ui';
import { invokeIpcAction } from '@app/utilities';
import { Id, IFish, IFishBase } from '@shared/models';
import { create } from 'zustand';

export interface IFishState {
  fishes: IFish[];
  addFish: (fish: IFishBase) => Promise<void>;
  deleteFish: (fish: IFish) => Promise<void>;
  loadPondFishes: (pondId: Id) => Promise<void>;
  updateFish: (fish: IFish) => Promise<void>;
}

export const useFishStore = create<IFishState>((set) => {
  return {
    fishes: [],
    addFish: async (fishToAdd) => {
      const response = await invokeIpcAction<IFishBase, IFish>('fish:add', fishToAdd);

      if (response.data) {
        set((state) => ({ fishes: [...state.fishes, response.data] }));
      }
    },
    deleteFish: async (fish) => {
      try {
        useAppProgressStore.getState().showProgress({
          message: t.fish.deleteProgressMessage,
          mode: 'indeterminate',
        });

        const response = await invokeIpcAction<IFish, void>('fish:delete', fish);

        if (!response.errorCode) {
          set((state) => ({
            fishes: removeItem(state.fishes, fish.id),
          }));
        }
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
    loadPondFishes: async (pondId) => {
      const response = await invokeIpcAction<Id, IFish[]>('fish:getByPondId', pondId);

      if (response.data) {
        set({ fishes: response.data });
      }
    },
    updateFish: async (fishToUpdate) => {
      const response = await invokeIpcAction<IFish, IFish>('fish:update', fishToUpdate);

      if (response.data) {
        set((state) => ({
          fishes: replaceItem(state.fishes, response.data),
        }));
      }
    },
  };
});
