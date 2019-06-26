import { Module } from "app/ioc";
import { addPond, deletePond, updatePond, getPonds } from "./actions";

export interface IPondActions {
  getPonds: typeof getPonds;
  addPond: typeof addPond;
  deletePond: typeof deletePond;
  updatePond: typeof updatePond;
}

@Module({
  actions: [getPonds, addPond, deletePond, updatePond]
})
export class PondModule {}
