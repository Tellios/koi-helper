import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { IImageBase, IImageReference, Id } from '@shared/models';
import { readFile } from 'fs/promises';
import * as path from 'path';

export interface IUploadImagesParams {
  referenceId: Id;
  type: 'ImageGallery' | 'Profile';
}

export const uploadImages: AsyncAction<IUploadImagesParams> = async (
  { state },
  { referenceId, type },
) => {
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
  state.appProgressOpen = true;
  state.appProgressMessage = t.common.imageGallery.uploadProgressMessage;
  state.appProgressMode = 'count';
  state.appProgressTotalCount = result.filePaths.length;
  state.appProgressCurrentCount = 0;

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

      state.appProgressCurrentCount = state.appProgressCurrentCount + 1;
      return addedImage.data;
    }),
  ).finally(() => {
    state.appProgressOpen = false;
  });
};
