import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { IFish, Id } from "app/storage";
import { Route } from "react-router";
import { DeleteButton } from "app/ui";
import { useAppState } from "app/state";

export interface IFishItemProps {
  fish: IFish;
  pondId: Id;
}

export const FishItem: React.FunctionComponent<IFishItemProps> = ({
  fish,
  pondId
}) => {
  const {
    actions: { deleteFish }
  } = useAppState();

  return (
    <Route
      render={({ history }) => (
        <ListItem
          button
          onClick={() => history.replace(`/ponds/${pondId}/fish/${fish.id}`)}
        >
          <ListItemText primary={fish.name} />
          <ListItemSecondaryAction>
            <DeleteButton onDelete={() => deleteFish(fish)} />
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
