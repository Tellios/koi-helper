export * from './details/DiseaseDetailsView';
export * from './list/DiseaseListView';

import { addDisease, deleteDisease, loadDiseases, updateDisease } from './actions';

export interface IDiseaseActions {
  addDisease: typeof addDisease;
  deleteDisease: typeof deleteDisease;
  updateDisease: typeof updateDisease;
  loadDiseases: typeof loadDiseases;
}

export const diseaseActions: IDiseaseActions = {
  addDisease,
  deleteDisease,
  updateDisease,
  loadDiseases,
};
