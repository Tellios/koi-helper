import { Module } from "app/ioc";
import { addFish, deleteFish, loadPondFishes, updateFish } from "./actions";

export interface IFishActions {
  addFish: typeof addFish;
  deleteFish: typeof deleteFish;
  loadPondFishes: typeof loadPondFishes;
  updateFish: typeof updateFish;
}

@Module({
  actions: [addFish, deleteFish, loadPondFishes, updateFish]
})
export class FishModule {}
