import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  IconButton
} from "@material-ui/core";
import { Delete, RestoreFromTrash } from "@material-ui/icons";
import { IPond } from "app/storage";
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
        <ListItem button onClick={() => history.push(`/pond/${pond.id}`)}>
          <ListItemAvatar>
            <Avatar
              alt={pond.name}
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary={pond.name}
            secondary={`Volume (liters): ${pond.volume}, Depth: ${pond.depth}`}
          />
          <ListItemSecondaryAction>
            {pond.archived ? (
              <IconButton onClick={() => actions.unArchivePond(pond)}>
                <RestoreFromTrash />
              </IconButton>
            ) : (
              <IconButton onClick={() => actions.archivePond(pond)}>
                <Delete />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
