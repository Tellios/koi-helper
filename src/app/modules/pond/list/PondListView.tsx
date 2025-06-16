import { t } from '@app/i18n';
import { useActions, useAppState } from '@app/state';
import { ListCard, mainBarActionEmitter } from '@app/ui';
import { combineUnbinds } from '@app/utilities';
import { List } from '@mui/material';
import * as React from 'react';
import { PondItem } from './PondItem';
import { sortItems } from './sortItems';

export const PondListView: React.FunctionComponent = () => {
  const state = useAppState();
  const actions = useActions();

  React.useEffect(() => {
    if (state.ponds.length === 0) {
      actions.getPonds();
    }

    actions.setMainBar({
      title: t.pond.pondListTitle,
      showBackButton: false,
      actions: [
        {
          name: 'addPond',
          label: t.pond.addPondAction,
        },
        {
          name: 'showArchived',
          label: t.common.toggleShowArchivedText(state.showArchivedPonds),
        },
      ],
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction('addPond', () => {
        actions.addPond({
          name: t.pond.newPondName,
          length: 2000,
          width: 145,
          volume: 1200,
          depth: 3,
          archived: false,
          treatments: [],
        });
      }),
      mainBarActionEmitter.onAction('showArchived', () => {
        actions.toggleShowArchivedPonds();
      }),
    ]);
  }, [actions, state.ponds.length, state.showArchivedPonds]);

  const listItems = state.ponds
    .filter((pond) => (state.showArchivedPonds ? true : !pond.archived))
    .sort(sortItems)
    .map((pond) => <PondItem key={pond.id} pond={pond} />);

  return (
    <ListCard>
      <List disablePadding>{listItems}</List>
    </ListCard>
  );
};
