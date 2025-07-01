import { invokeIpcAction } from '@app/utilities';
import { Id } from '@shared/models';

export const deleteImagesForReference = async (referenceId: Id) => {
  await invokeIpcAction<Id, void>('image:deleteForReference', referenceId);
};
