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
  actions: [addVariety, deleteVariety, updateVariety, loadVarieties]
})
export class VarietyModule {}
