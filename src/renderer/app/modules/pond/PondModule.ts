import { Module } from "app/ioc";
import {
  addPond,
  archivePond,
  unArchivePond,
  updatePond,
  getPonds,
  toggleShowArchivedPonds
} from "./actions";

export interface IPondActions {
  getPonds: typeof getPonds;
  addPond: typeof addPond;
  archivePond: typeof archivePond;
  unArchivePond: typeof unArchivePond;
  updatePond: typeof updatePond;
  toggleShowArchivedPonds: typeof toggleShowArchivedPonds;
}

@Module({
  actions: [
    getPonds,
    addPond,
    archivePond,
    unArchivePond,
    updatePond,
    toggleShowArchivedPonds
  ]
})
export class PondModule {}
