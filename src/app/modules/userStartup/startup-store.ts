import { dialog } from '@electron/remote';
import { create } from 'zustand';

import { useI18nStore } from '@app/i18n';
import { useSettingsStore } from '@app/settings';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { t } from '@shared/i18n';
import { logger } from '@shared/logger';
import path from 'path';
import { useDiseaseStore } from '../disease';
import { usePondStore } from '../pond';
import { useVarietyStore } from '../variety';
import { fileFilters } from './utils';

export interface IStartupState {
  appLoading: boolean;
  appLoaded: boolean;
  loadFileErrorMessage: string | undefined;
  failedToLoadFile: boolean;
  fileLoaded: boolean;
  loadingFile: boolean;
  loadApp: () => Promise<void>;
  loadFile: (options: { filename: string; openFile: boolean }) => Promise<void>;
  newFile: () => Promise<void>;
  openExistingFile: () => Promise<void>;
}

export const useStartupStore = create<IStartupState>((set, get) => {
  return {
    appLoading: false,
    appLoaded: false,
    loadFileErrorMessage: undefined,
    failedToLoadFile: false,
    fileLoaded: false,
    loadingFile: false,
    loadApp: async () => {
      logger.verbose(`Loading app`);
      set((state) => ({ ...state, appLoading: true }));

      const unsubscribe = useSettingsStore.subscribe(async (settings) => {
        unsubscribe();

        if (settings.loaded) {
          await useI18nStore.getState().loadTranslations(settings.settings.language);

          if (settings.settings.lastLoadedFile) {
            await get().loadFile({
              filename: settings.settings.lastLoadedFile,
              openFile: true,
            });
          }

          set((state) => ({ ...state, appLoaded: true, appLoading: false }));
          logger.verbose(`App loaded`);
        }
      });

      await useSettingsStore.getState().loadSettings();
    },
    loadFile: async ({ filename, openFile }: { filename: string; openFile: boolean }) => {
      logger.verbose(`Loading koi-helper file: ${filename}`);
      set((state) => ({
        ...state,
        activeFile: filename,
        fileLoaded: false,
        failedToLoadFile: false,
        loadingFile: true,
      }));

      try {
        if (openFile) {
          const response = await invokeIpcAction<string, void>('userStartup:loadFile', filename);

          if (response.errorCode) {
            logger.warn(
              `Failed to load koi-helper file: ${response.errorCode}, ${response.message}`,
            );
            throw new Error(response.message);
          }
        }

        logger.verbose(`Koi-helper file loaded. Initializing data.`);

        await useVarietyStore.getState().loadVarieties();
        await useDiseaseStore.getState().loadDiseases();
        await usePondStore.getState().loadPonds();

        document.title = filename;

        set((state) => ({ ...state, fileLoaded: true }));
      } catch (err) {
        logger.error(err);

        set((state) => ({ ...state, failedToLoadFile: true }));

        if (openFile && err instanceof Error) {
          set((state) => ({ ...state, loadFileErrorMessage: err.message }));
        } else {
          set((state) => ({ ...state, loadFileErrorMessage: t.file.errors.unableToReadOrWrite }));
        }
      }

      set((state) => ({ ...state, loadingFile: false }));
    },
    newFile: async () => {
      try {
        const result = await dialog.showSaveDialog({
          filters: fileFilters,
        });

        if (result.canceled || !result.filePath) {
          return;
        }

        let filename = result.filePath;
        const extension = path.extname(filename);

        if (extension !== '.khlpr') {
          filename += '.khlpr';
        }

        const response = await invokeIpcAction<string, void>('userStartup:newFile', filename);

        if (response.errorCode) {
          throw new Error(response.message);
        }

        await useSettingsStore.getState().updateSettings({ lastLoadedFile: filename });
        await get().loadFile({ filename, openFile: false });
      } catch (err) {
        if (err instanceof Error) {
          logger.error(`Error creating new file: ${err.message}\nStack: ${err.stack}`);
        } else {
          logger.error(err);
        }

        set((state) => ({
          ...state,
          failedToLoadFile: true,
          loadFileErrorMessage: t.file.errors.unableToReadOrWrite,
        }));
      }
    },
    openExistingFile: async () => {
      try {
        logger.verbose(`Opening select files dialog in singleSelect mode`);
        const result = await selectFiles({
          mode: 'singleSelect',
          filters: fileFilters,
        });

        if (!result.filePaths || result.filePaths.length === 0) {
          logger.verbose(`No files were selected, ignoring further file opening action`);
          return;
        }

        const filename = result.filePaths[0];

        set((state) => ({ ...state, appLoading: true, loadingFile: true }));

        logger.verbose(`File ${filename} selected - opening`);
        const response = await invokeIpcAction<string, void>('userStartup:openFile', filename);

        if (response.errorCode) {
          throw new Error(response.message);
        }

        await useSettingsStore.getState().updateSettings({ lastLoadedFile: filename });
        await get().loadFile({ filename, openFile: false });
      } catch (err) {
        logger.error(err);

        set((state) => ({
          ...state,
          failedToLoadFile: true,
          loadFileErrorMessage: t.file.errors.unableToReadOrWrite,
        }));
      } finally {
        set((state) => ({ ...state, appLoading: false }));
      }
    },
  };
});
