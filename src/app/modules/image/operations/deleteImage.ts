import { invokeIpcAction } from '@app/utilities';
import { Id } from '@shared/models';

export const deleteImage = async (imageId: Id) => {
  await invokeIpcAction<Id, void>('image:delete', imageId);
};
