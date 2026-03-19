import { replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond, IPondBase } from '@shared/models';
import { create } from 'zustand';

export interface IPondState {
  ponds: IPond[];
  showArchivedPonds: boolean;
  addPond: (pond: IPondBase) => Promise<void>;
  archivePond: (pond: IPond) => Promise<void>;
  deletePond: (pond: IPond) => Promise<void>;
  getPonds: () => Promise<void>;
  toggleShowArchivedPonds: () => void;
  unArchivePond: (pond: IPond) => Promise<void>;
  updatePond: (pond: IPond) => Promise<void>;
}

export const usePondStore = create<IPondState>((set) => {
  return {
    ponds: [],
    showArchivedPonds: false,
    async addPond(pond: IPondBase) {
      const response = await invokeIpcAction<IPondBase, IPond>('pond:add', pond);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, ponds: [...state.ponds, response.data] }));
    },
    archivePond: async (pond: IPond) => {
      const response = await invokeIpcAction<IPond, IPond>('pond:archive', pond);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, ponds: replaceItem(state.ponds, response.data) }));
    },
    deletePond: async (pond: IPond) => {
      const response = await invokeIpcAction<IPond, IPond>('pond:delete', pond);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, ponds: state.ponds.filter((p) => p.id !== pond.id) }));
    },
    getPonds: async () => {
      const response = await invokeIpcAction<void, IPond[]>('pond:getAll', undefined);

      if (response.errorCode) {
        set((state) => ({ ...state, ponds: [] }));
        return;
      }

      set((state) => ({ ...state, ponds: response.data }));
    },
    toggleShowArchivedPonds: () => {
      set((state) => ({ ...state, showArchivedPonds: !state.showArchivedPonds }));
    },
    unArchivePond: async (pond: IPond) => {
      const response = await invokeIpcAction<IPond, IPond>('pond:unArchive', pond);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, ponds: replaceItem(state.ponds, response.data) }));
    },
    updatePond: async (pond: IPond) => {
      const response = await invokeIpcAction<IPond, IPond>('pond:update', pond);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, ponds: replaceItem(state.ponds, response.data) }));
    },
  };
});
