import { t } from '@app/i18n';
import { ListCard, mainBarActionEmitter, useMainBarStore } from '@app/ui';
import { combineUnbinds } from '@app/utilities';
import { List } from '@mui/material';
import * as React from 'react';
import { usePondStore } from '../pond-store';
import { PondItem } from './PondItem';
import { sortItems } from './sortItems';

export const PondListView: React.FunctionComponent = () => {
  const { ponds, loadPonds, showArchivedPonds, addPond, toggleShowArchivedPonds } = usePondStore();
  const { setOptions } = useMainBarStore();

  React.useEffect(() => {
    if (ponds.length === 0) {
      loadPonds();
    }

    setOptions({
      title: t.pond.pondListTitle,
      showBackButton: false,
      actions: [
        {
          name: 'addPond',
          label: t.pond.addPondAction,
        },
        {
          name: 'showArchived',
          label: t.common.toggleShowArchivedText(showArchivedPonds),
        },
      ],
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction('addPond', () => {
        addPond({
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
        toggleShowArchivedPonds();
      }),
    ]);
  }, [loadPonds, addPond, toggleShowArchivedPonds, setOptions, ponds, showArchivedPonds]);

  const listItems = React.useMemo(
    () =>
      ponds
        .filter((pond) => (showArchivedPonds ? true : !pond.archived))
        .sort(sortItems)
        .map((pond) => <PondItem key={pond.id} pond={pond} />),
    [ponds, showArchivedPonds],
  );

  return (
    <ListCard>
      <List disablePadding>{listItems}</List>
    </ListCard>
  );
};
