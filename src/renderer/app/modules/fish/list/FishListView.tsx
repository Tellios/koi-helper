import * as React from "react";
import { List } from "@material-ui/core";
import { useAppState } from "app/state";
import { Id } from "app/storage";
import { ListCard, ContentCard, Row } from "app/ui";
import { FishDetailsView } from "../details";
import { FishListHeaderView } from "./FishListHeaderView";
import { FishItem } from "./FishItem";

export interface IFishListViewProps {
  pondId: Id;
}

export const FishListView: React.FunctionComponent<IFishListViewProps> = ({
  pondId
}) => {
  const { state, actions } = useAppState();
  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

  React.useEffect(() => {
    actions.loadPondFishes(pondId);
  }, []);

  const listItems = state.fishes.map(fish => (
    <FishItem
      key={fish.id}
      fish={fish}
      selected={fish.id === selected}
      onClick={fish => setSelected(fish.id)}
      onDeleted={fish => fish.id === selected && setSelected(undefined)}
    />
  ));

  return (
    <Row>
      <ListCard>
        <FishListHeaderView pondId={pondId} />
        <List>{listItems}</List>
      </ListCard>

      {selected && (
        <ContentCard fillWidth disableScroll>
          <FishDetailsView fishId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
