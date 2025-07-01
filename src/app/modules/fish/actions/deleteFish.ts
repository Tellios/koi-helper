import { t } from '@app/i18n';
import { AsyncAction, removeItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IFish } from '@shared/models';

export const deleteFish: AsyncAction<IFish> = async ({ state }, fishToDelete) => {
  state.appProgressOpen = true;
  state.appProgressMode = 'indeterminate';
  state.appProgressMessage = t.fish.deleteProgressMessage;

  const response = await invokeIpcAction<IFish, void>('fish:delete', fishToDelete);

  if (response.data) {
    state.fishes = removeItem(state.fishes, fishToDelete.id);
  }

  state.appProgressOpen = false;
};
