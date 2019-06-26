import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  IconButton
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { IPond } from "app/repositories";
import { Route } from "react-router";
import { useAppState } from "app/state";

export interface IPondListItemProps {
  pond: IPond;
}

export const PondItem: React.FunctionComponent<IPondListItemProps> = ({
  pond
}) => {
  const { actions } = useAppState();

  return (
    <Route
      render={({ history }) => (
        <ListItem button onClick={() => history.push(`/pond/${pond.Id}`)}>
          <ListItemAvatar>
            <Avatar
              alt={pond.Name}
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary={pond.Name}
            secondary={`Liters: ${pond.Liters}, Depth: ${pond.Depth}`}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => actions.deletePond(pond)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
