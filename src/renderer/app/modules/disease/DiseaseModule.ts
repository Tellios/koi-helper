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
  name: "disease",
  actions: [
    { name: "addDisease", action: addDisease },
    { name: "deleteDisease", action: deleteDisease },
    { name: "updateDisease", action: updateDisease },
    { name: "loadDiseases", action: loadDiseases }
  ]
})
export class DiseaseModule {}
