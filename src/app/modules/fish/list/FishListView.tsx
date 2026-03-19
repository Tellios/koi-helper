import { ContentCard, ListCard, Row } from '@app/ui';
import { List } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { FishDetailsView } from '../details';
import { useFishStore } from '../fish-store';
import { FishItem } from './FishItem';
import { FishListHeaderView } from './FishListHeaderView';

export interface IFishListViewProps {
  pondId: Id;
}

export const FishListView: React.FunctionComponent<IFishListViewProps> = ({ pondId }) => {
  const { fishes, loadPondFishes } = useFishStore();
  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

  React.useEffect(() => {
    loadPondFishes(pondId);
  }, [loadPondFishes, pondId]);

  const listItems = fishes.map((fish) => (
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
        <ContentCard id="fish-details" fillWidth disableScroll animate>
          <FishDetailsView fishId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
