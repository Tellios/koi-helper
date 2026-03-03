import { useActions, useAppState } from '@app/state';
import { ContentCard, ListCard, Row } from '@app/ui';
import { List } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { FishDetailsView } from '../details';
import { FishItem } from './FishItem';
import { FishListHeaderView } from './FishListHeaderView';

export interface IFishListViewProps {
  pondId: Id;
}

export const FishListView: React.FunctionComponent<IFishListViewProps> = ({ pondId }) => {
  const state = useAppState();
  const actions = useActions();
  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

  React.useEffect(() => {
    actions.loadPondFishes(pondId);
  }, [actions, pondId]);

  const listItems = state.fishes.map((fish) => (
    <FishItem
      key={fish.id}
      fish={fish}
      selected={fish.id === selected}
      onClick={(fish) => setSelected(fish.id)}
      onDeleted={(fish) => fish.id === selected && setSelected(undefined)}
    />
  ));

  return (
    <Row fillHeight>
      <ListCard>
        <FishListHeaderView pondId={pondId} />
        <List>{listItems}</List>
      </ListCard>

      {selected && (
        <ContentCard id="fish-details" fillWidth disableScroll>
          <FishDetailsView fishId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
