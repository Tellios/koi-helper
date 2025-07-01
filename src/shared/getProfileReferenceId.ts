import type { Id } from './models';

export const getProfileReferenceId = (referenceId: Id): Id => {
  return referenceId + '_profileImage';
};
