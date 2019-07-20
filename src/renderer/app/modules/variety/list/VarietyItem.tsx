import * as React from "react";
import { IVariety } from "app/storage";
import { useAppState } from "app/state";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { t } from "app/i18n";
import { Delete } from "@material-ui/icons";
import { Route } from "react-router";

export interface IVarietyItemProps {
  variety: IVariety;
}

export const VarietyItem: React.FunctionComponent<IVarietyItemProps> = ({
  variety
}) => {
  const { actions } = useAppState();

  return (
    <Route
      render={({ history }) => (
        <ListItem
          button
          onClick={() =>
            history.replace(`/varieties/${variety.id}`, { id: variety.id })
          }
        >
          <ListItemText primary={variety.name} />
          <ListItemSecondaryAction>
            <IconButton
              title={t.variety.deleteAction}
              onClick={() => {
                const state = history.location.state;

                if (state && state.id === variety.id) {
                  history.replace("/varieties");
                }

                actions.deleteVariety(variety.id);
              }}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
