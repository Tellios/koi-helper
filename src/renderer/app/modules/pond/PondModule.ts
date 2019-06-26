import { Module } from "app/ioc";
import { addPond, deletePond, updatePond } from "./actions";

export interface IPondActions {
  addPond: typeof addPond;
  deletePond: typeof deletePond;
  updatePond: typeof updatePond;
}

@Module({
  actions: [addPond, deletePond, updatePond]
})
export class PondModule {}
