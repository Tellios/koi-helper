import { Context } from './Context';
import { defaultState } from './State';
import * as effects from './effects';

import { i18nActions } from '../i18n';
import { diseaseActions } from '../modules/disease';
import { fileActions } from '../modules/file';
import { fishActions } from '../modules/fish';
import { imageActions } from '../modules/image';
import { measurementActions } from '../modules/measurement';
import { pondActions } from '../modules/pond';
import { userStartupActions } from '../modules/userStartup';
import { varietyActions } from '../modules/variety';
import { settingsActions } from '../settings';
import { mainMenuActions, uiActions } from '../ui';

export function getConfig(): Pick<Context, 'state' | 'actions' | 'effects'> {
  const actions = {
    ...i18nActions,
    ...diseaseActions,
    ...fileActions,
    ...fishActions,
    ...imageActions,
    ...measurementActions,
    ...pondActions,
    ...userStartupActions,
    ...varietyActions,
    ...settingsActions,
    ...uiActions,
    ...mainMenuActions,
  };

  return {
    state: defaultState,
    actions: actions as unknown as Context['actions'],
    effects,
  };
}
