import * as React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { IFish } from "app/storage";
import { Route } from "react-router";

export interface IFishItemProps {
  fish: IFish;
}

export const FishItem: React.FunctionComponent<IFishItemProps> = ({ fish }) => {
  return (
    <Route
      render={() => (
        <ListItem button>
          <ListItemText primary={fish.name} />
        </ListItem>
      )}
    />
  );
};
