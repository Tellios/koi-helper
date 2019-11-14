import * as React from "react";
import { IVariety } from "app/storage";
import { useAppState } from "app/state";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Route } from "react-router";
import { DeleteButton } from "app/ui";

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
            <DeleteButton
              onDelete={() => {
                const state = history.location.state;

                if (state && state.id === variety.id) {
                  history.replace("/varieties");
                }

                actions.deleteVariety(variety.id);
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
