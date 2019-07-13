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

export interface IVarietyItemProps {
  variety: IVariety;
}

export const VarietyItem: React.FunctionComponent<IVarietyItemProps> = ({
  variety
}) => {
  const { actions } = useAppState();

  return (
    <ListItem>
      <ListItemText
        primary={variety.name}
        secondary={variety.description.substr(0, 200)}
      />
      <ListItemSecondaryAction>
        <IconButton
          title={t.variety.deleteAction}
          onClick={() => actions.deleteVariety(variety.id)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
