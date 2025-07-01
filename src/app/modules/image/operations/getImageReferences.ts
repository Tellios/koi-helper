import { invokeIpcAction } from '@app/utilities';
import { Id, IImageReference } from '@shared/models';

export const getImageReferences = async (referenceId: string): Promise<IImageReference[]> => {
  const response = await invokeIpcAction<Id, IImageReference[]>('image:getReferences', referenceId);

  if (response.errorCode) {
    throw new Error(response.message);
  }

  return response.data;
};
