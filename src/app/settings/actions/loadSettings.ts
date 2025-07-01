import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IAppSettings } from '@shared/models';

export const loadSettings: AsyncAction = async ({ state }) => {
  const response = await invokeIpcAction<void, IAppSettings>('settings:getAll', undefined);

  if (response.errorCode) {
    return;
  }

  state.settings = {
    settings: response.data,
    loaded: true,
    showDialog: false,
  };
};
