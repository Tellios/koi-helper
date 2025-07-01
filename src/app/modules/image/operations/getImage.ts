import { invokeIpcAction } from '@app/utilities';
import { IImage, Id } from '@shared/models';

export const getImage = async (id: Id, isThumbnail: boolean): Promise<IImage> => {
  const response = await invokeIpcAction<{ id: Id; isThumbnail: boolean }, IImage>('image:get', {
    id,
    isThumbnail,
  });

  if (response.errorCode) {
    throw new Error(response.message);
  }

  return response.data;
};
