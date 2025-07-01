import { invokeIpcAction } from '@app/utilities';
import { Id, IFileReference } from '@shared/models';

export const getFileReferences = async (referenceId: Id): Promise<IFileReference[]> => {
  const response = await invokeIpcAction<Id, IFileReference[]>('file:getReferences', referenceId);

  if (response.errorCode) {
    throw new Error(`Error getting file references: ${response.message}`);
  }

  return response.data;
};
