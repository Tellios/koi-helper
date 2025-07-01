export * from './actions';
export * from './components';
export * from './details/VarietyDetailsView';
export * from './list/VarietyListView';

import { addVariety, deleteVariety, loadVarieties, updateVariety } from './actions';

export interface IVarietyActions {
  addVariety: typeof addVariety;
  deleteVariety: typeof deleteVariety;
  updateVariety: typeof updateVariety;
  loadVarieties: typeof loadVarieties;
}

export const varietyActions: IVarietyActions = {
  addVariety,
  deleteVariety,
  updateVariety,
  loadVarieties,
};
