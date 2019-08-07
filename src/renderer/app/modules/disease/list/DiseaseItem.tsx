import * as React from "react";
import { IDisease } from "app/storage";
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
            <IconButton
              title={t.disease.deleteAction}
              onClick={() => {
                const state = history.location.state;

                if (state && state.id === disease.id) {
                  history.replace("/diseases");
                }

                actions.deleteDisease(disease.id);
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
