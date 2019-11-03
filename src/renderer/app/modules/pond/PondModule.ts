import { Module } from "app/ioc";
import {
  addPond,
  archivePond,
  deletePond,
  unArchivePond,
  updatePond,
  getPonds,
  toggleShowArchivedPonds
} from "./actions";

export interface IPondActions {
  getPonds: typeof getPonds;
  addPond: typeof addPond;
  deletePond: typeof deletePond;
  archivePond: typeof archivePond;
  unArchivePond: typeof unArchivePond;
  updatePond: typeof updatePond;
  toggleShowArchivedPonds: typeof toggleShowArchivedPonds;
}

@Module({
  actions: [
    getPonds,
    addPond,
    deletePond,
    archivePond,
    unArchivePond,
    updatePond,
    toggleShowArchivedPonds
  ]
})
export class PondModule {}
