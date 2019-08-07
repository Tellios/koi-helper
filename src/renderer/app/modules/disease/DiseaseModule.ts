import { Module } from "app/ioc";
import {
  addDisease,
  deleteDisease,
  loadDiseases,
  updateDisease
} from "./actions";

export interface IDiseaseActions {
  addDisease: typeof addDisease;
  deleteDisease: typeof deleteDisease;
  updateDisease: typeof updateDisease;
  loadDiseases: typeof loadDiseases;
}

@Module({
  actions: [addDisease, deleteDisease, updateDisease, loadDiseases]
})
export class DiseaseModule {}
