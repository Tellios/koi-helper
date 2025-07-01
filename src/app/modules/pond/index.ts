export * from './details/PondDetailsView';
export * from './list/PondListView';

import {
  addPond,
  archivePond,
  deletePond,
  getPonds,
  toggleShowArchivedPonds,
  unArchivePond,
  updatePond,
} from './actions';

export interface IPondActions {
  getPonds: typeof getPonds;
  addPond: typeof addPond;
  deletePond: typeof deletePond;
  archivePond: typeof archivePond;
  unArchivePond: typeof unArchivePond;
  updatePond: typeof updatePond;
  toggleShowArchivedPonds: typeof toggleShowArchivedPonds;
}

export const pondActions: IPondActions = {
  getPonds,
  addPond,
  deletePond,
  archivePond,
  unArchivePond,
  updatePond,
  toggleShowArchivedPonds,
};
