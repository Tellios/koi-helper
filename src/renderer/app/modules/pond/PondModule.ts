import { Module } from "../../ioc";
import { addPond, deletePond, updatePond } from "./actions";

@Module({
  actions: [addPond, deletePond, updatePond]
})
export class PondModule {}
