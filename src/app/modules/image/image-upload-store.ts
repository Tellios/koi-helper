import { t } from '@app/i18n';
import { useAppProgressStore } from '@app/ui';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { Id, IImageBase, IImageReference } from '@shared/models';
import { readFile } from 'fs/promises';
import path from 'path';
import { create } from 'zustand';

export interface IUploadImagesParams {
  referenceId: Id;
  type: 'ImageGallery' | 'Profile';
}

export const useImageUploadStore = create<{
  uploadImage: (options: IUploadImagesParams) => Promise<void>;
}>(() => {
  return {
    uploadImage: async ({ referenceId, type }) => {
      const result = await selectFiles({
        mode: type === 'ImageGallery' ? 'multiSelect' : 'singleSelect',
        filters: [
          {
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png'],
          },
        ],
      });

      if (!result.filePaths || result.filePaths.length === 0) {
        return;
      }

      const imageFiles = result.filePaths;
      useAppProgressStore.getState().showProgress({
        message: t.common.imageGallery.uploadProgressMessage,
        mode: 'count',
        totalCount: result.filePaths.length,
        currentCount: 0,
      });

      await Promise.all(
        imageFiles.map(async (filename): Promise<IImageReference> => {
          const name = path.parse(filename).name;

          const fileBuffer = await readFile(filename);

          const encodedThumbnail = await invokeIpcAction<string, string>(
            'image:generateThumbnail',
            fileBuffer.toString('base64'),
          );

          if (encodedThumbnail.errorCode) {
            throw new Error(encodedThumbnail.message);
          }

          const thumbnail: IImageBase = {
            name,
            isThumbnail: true,
            reference: referenceId,
            data: encodedThumbnail.data,
          };

          const encodedPng = await invokeIpcAction<string, string>(
            'image:convertToPng',
            fileBuffer.toString('base64'),
          );

          if (encodedPng.errorCode) {
            throw new Error(encodedPng.message);
          }

          const image: IImageBase = {
            name,
            isThumbnail: false,
            reference: referenceId,
            data: encodedPng.data,
          };

          const addedImage = await invokeIpcAction<
            { image: IImageBase; thumbnail: IImageBase },
            IImageReference
          >('image:add', { image, thumbnail });

          if (addedImage.errorCode) {
            throw new Error(addedImage.message);
          }

          const { currentCount } = useAppProgressStore.getState();

          useAppProgressStore.getState().showProgress({
            currentCount: currentCount + 1,
          });

          return addedImage.data;
        }),
      ).finally(() => {
        useAppProgressStore.getState().hideProgress();
      });
    },
  };
});
