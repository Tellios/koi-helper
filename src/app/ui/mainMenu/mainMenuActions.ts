import { Action, Context } from '@app/state';

export const appMenuToggleOpen: Action<void> = ({ state }: Context) => {
  state.appMenuOpen = !state.appMenuOpen;
};
