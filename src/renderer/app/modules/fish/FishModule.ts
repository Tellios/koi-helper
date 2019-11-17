import { Module } from "app/ioc";
import { addFish, deleteFish, loadPondFishes, updateFish } from "./actions";

export interface IFishActions {
  addFish: typeof addFish;
  deleteFish: typeof deleteFish;
  loadPondFishes: typeof loadPondFishes;
  updateFish: typeof updateFish;
}

@Module({
  name: "fish",
  actions: [
    { name: "addFish", action: addFish },
    { name: "deleteFish", action: deleteFish },
    { name: "loadPondFishes", action: loadPondFishes },
    { name: "updateFish", action: updateFish }
  ]
})
export class FishModule {}
