import * as React from "react";
import { List } from "@material-ui/core";
import { useAppState } from "app/state";
import { Id } from "app/storage";
import { FishItem } from "./FishItem";

export interface IFishListViewProps {
  pondId: Id;
}

export const FishListView: React.FunctionComponent<IFishListViewProps> = ({
  pondId
}) => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    actions.loadPondFishes(pondId);
  }, []);

  const listItems = state.fishes.map(fish => (
    <FishItem key={fish.id} fish={fish} pondId={pondId} />
  ));

  return <List disablePadding>{listItems}</List>;
};
