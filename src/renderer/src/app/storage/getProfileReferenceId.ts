import type { Id } from './Id';

export const getProfileReferenceId = (referenceId: Id): Id => {
  return referenceId + '_profileImage';
};
