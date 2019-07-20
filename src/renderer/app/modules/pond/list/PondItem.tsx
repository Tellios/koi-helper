import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  IconButton
} from "@material-ui/core";
import { Unarchive, Archive } from "@material-ui/icons";
import { IPond } from "app/storage";
import { Route } from "react-router";
import { useAppState } from "app/state";
import { t } from "app/i18n";

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
        <ListItem button onClick={() => history.push(`/ponds/${pond.id}`)}>
          <ListItemAvatar>
            <Avatar
              alt={pond.name}
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary={pond.name}
            secondary={`${t.pond.volumeLabel}: ${pond.volume}, ${t.pond.depthLabel}: ${pond.depth}`}
          />
          <ListItemSecondaryAction>
            <IconButton
              title={t.common.toggleArchiveAction(pond.archived)}
              onClick={() =>
                pond.archived
                  ? actions.unArchivePond(pond)
                  : actions.archivePond(pond)
              }
            >
              {pond.archived ? <Unarchive /> : <Archive />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
