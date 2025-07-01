export * from './details';
export * from './list/FishListHeaderView';
export * from './list/FishListView';

import { addFish, deleteFish, loadPondFishes, updateFish } from './actions';

export interface IFishActions {
  addFish: typeof addFish;
  deleteFish: typeof deleteFish;
  loadPondFishes: typeof loadPondFishes;
  updateFish: typeof updateFish;
}

export const fishActions: IFishActions = {
  addFish,
  deleteFish,
  loadPondFishes,
  updateFish,
};
