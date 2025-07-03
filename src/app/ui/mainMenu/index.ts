import { appMenuToggleOpen } from './mainMenuActions';

export * from './MainMenu';

export interface IMainMenuActions {
  appMenuToggleOpen: typeof appMenuToggleOpen;
}

export const mainMenuActions: IMainMenuActions = {
  appMenuToggleOpen,
};
