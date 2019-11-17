import { Module } from "app/ioc";
import {
  addVariety,
  deleteVariety,
  loadVarieties,
  updateVariety
} from "./actions";

export interface IVarietyActions {
  addVariety: typeof addVariety;
  deleteVariety: typeof deleteVariety;
  updateVariety: typeof updateVariety;
  loadVarieties: typeof loadVarieties;
}

@Module({
  name: "variety",
  actions: [
    { name: "addVariety", action: addVariety },
    { name: "deleteVariety", action: deleteVariety },
    { name: "updateVariety", action: updateVariety },
    { name: "loadVarieties", action: loadVarieties }
  ]
})
export class VarietyModule {}
