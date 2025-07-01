import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { IImageBase, IImageReference, Id } from '@shared/models';
import * as path from 'path';
import sharp from 'sharp';

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

      const thumbnailBuffer = await sharp(filename)
        .resize(null, 160)
        .toFormat(sharp.format.png)
        .toBuffer();

      const thumbnail: IImageBase = {
        name,
        isThumbnail: true,
        reference: referenceId,
        data: thumbnailBuffer.toString('base64'),
      };

      const imageBuffer = await sharp(filename).toFormat(sharp.format.png).toBuffer();

      const image: IImageBase = {
        name,
        isThumbnail: false,
        reference: referenceId,
        data: imageBuffer.toString('base64'),
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
