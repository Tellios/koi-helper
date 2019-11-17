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
  name: "pond",
  actions: [
    { name: "getPonds", action: getPonds },
    { name: "addPond", action: addPond },
    { name: "deletePond", action: deletePond },
    { name: "archivePond", action: archivePond },
    { name: "unArchivePond", action: unArchivePond },
    { name: "updatePond", action: updatePond },
    { name: "toggleShowArchivedPonds", action: toggleShowArchivedPonds }
  ]
})
export class PondModule {}
