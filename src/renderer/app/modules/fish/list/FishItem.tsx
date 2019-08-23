import * as React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { IFish, Id } from "app/storage";
import { Route } from "react-router";

export interface IFishItemProps {
  fish: IFish;
  pondId: Id;
}

export const FishItem: React.FunctionComponent<IFishItemProps> = ({
  fish,
  pondId
}) => {
  return (
    <Route
      render={({ history }) => (
        <ListItem
          button
          onClick={() => history.replace(`/ponds/${pondId}/fish/${fish.id}`)}
        >
          <ListItemText primary={fish.name} />
        </ListItem>
      )}
    />
  );
};
