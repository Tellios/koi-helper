import * as React from "react";
import { IDisease } from "app/storage";
import { useAppState } from "app/state";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Route } from "react-router";
import { DeleteButton } from "app/ui";

export interface IDiseaseItemProps {
  disease: IDisease;
}

export const DiseaseItem: React.FunctionComponent<IDiseaseItemProps> = ({
  disease
}) => {
  const { actions } = useAppState();

  return (
    <Route
      render={({ history }) => (
        <ListItem
          button
          onClick={() =>
            history.replace(`/diseases/${disease.id}`, { id: disease.id })
          }
        >
          <ListItemText primary={disease.name} />
          <ListItemSecondaryAction>
            <DeleteButton
              onDelete={() => {
                const state = history.location.state;

                if (state && state.id === disease.id) {
                  history.replace("/diseases");
                }

                actions.deleteDisease(disease.id);
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      )}
    />
  );
};
