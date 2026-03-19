import { t } from '@app/i18n';
import { removeItem, replaceItem } from '@app/state';
import { useAppProgressStore } from '@app/ui';
import { invokeIpcAction } from '@app/utilities';
import { logger } from '@shared/logger';
import { Id, IVariety, IVarietyBase } from '@shared/models';
import { toast } from 'react-toastify';
import { create } from 'zustand';

export interface VarietyState {
  varieties: IVariety[];
  addVariety(variety: IVarietyBase): Promise<void>;
  deleteVariety(varietyId: Id): Promise<void>;
  loadVarieties(): Promise<void>;
  updateVariety(variety: IVariety): Promise<void>;
}

export const useVarietyStore = create<VarietyState>((set) => ({
  varieties: [],
  addVariety: async (variety) => {
    const response = await invokeIpcAction<IVarietyBase, IVariety>('variety:add', variety);

    if (response.errorCode) {
      return;
    }

    set((state) => ({
      ...state,
      varieties: [...state.varieties, response.data],
    }));
  },
  deleteVariety: async (varietyId) => {
    try {
      useAppProgressStore
        .getState()
        .showProgress({ message: t.variety.deleteProgressMessage, mode: 'indeterminate' });

      const response = await invokeIpcAction<Id, void>('variety:delete', varietyId);

      if (response.errorCode) {
        if (response.errorCode === 'REFERENCED_BY_ENTITY') {
          toast.warn(response.message);
        } else {
          logger.error(response.message);
        }

        return;
      }

      set((state) => ({
        ...state,
        varieties: removeItem(state.varieties, varietyId),
      }));
    } finally {
      useAppProgressStore.getState().hideProgress();
    }
  },
  loadVarieties: async () => {
    const response = await invokeIpcAction<void, IVariety[]>('variety:getAll', undefined);

    if (response.errorCode) {
      return;
    }

    set((state) => ({
      ...state,
      varieties: response.data,
    }));
  },
  updateVariety: async (variety) => {
    const response = await invokeIpcAction<IVariety, IVariety>('variety:update', variety);

    if (response.errorCode) {
      return;
    }

    set((state) => ({
      ...state,
      varieties: replaceItem(state.varieties, response.data),
    }));
  },
}));
