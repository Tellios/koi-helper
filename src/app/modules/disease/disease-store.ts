import { t } from '@shared/i18n';
import { removeItem, replaceItem } from '@app/state';
import { useAppProgressStore } from '@app/ui';
import { invokeIpcAction } from '@app/utilities';
import { Id, IDisease, IDiseaseBase } from '@shared/models';
import { toast } from 'react-toastify';
import { create } from 'zustand';

export interface IDiseaseState {
  diseases: IDisease[];
  addDisease: (disease: IDiseaseBase) => Promise<void>;
  deleteDisease: (diseaseId: Id) => Promise<void>;
  loadDiseases: () => Promise<void>;
  updateDisease: (disease: IDisease) => Promise<void>;
}

export const useDiseaseStore = create<IDiseaseState>((set) => {
  return {
    diseases: [],
    addDisease: async (disease) => {
      const response = await invokeIpcAction<IDiseaseBase, IDisease>('disease:add', disease);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, diseases: [...state.diseases, response.data] }));
    },
    deleteDisease: async (diseaseId) => {
      try {
        useAppProgressStore.getState().showProgress({
          message: t.disease.deleteProgressMessage,
          mode: 'indeterminate',
        });

        const response = await invokeIpcAction<Id, void>('disease:delete', diseaseId);

        if (response.errorCode) {
          if (response.errorCode === 'REFERENCED_BY_ENTITY') {
            toast.warn(response.message);
          }
        } else {
          set((state) => ({ ...state, diseases: removeItem(state.diseases, diseaseId) }));
        }
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
    loadDiseases: async () => {
      const response = await invokeIpcAction<void, IDisease[]>('disease:getAll', undefined);

      if (response.data) {
        set((state) => ({ ...state, diseases: response.data }));
      }
    },
    updateDisease: async (disease: IDisease) => {
      const response = await invokeIpcAction<IDisease, IDisease>('disease:update', disease);

      if (response.data) {
        set((state) => ({ ...state, diseases: replaceItem(state.diseases, response.data) }));
      }
    },
  };
});
