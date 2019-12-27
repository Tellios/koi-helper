import * as React from "react";
import { IVariety } from "app/storage";
import { useAppState } from "app/state";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { DeleteButton } from "app/ui";

export interface IVarietyItemProps {
  variety: IVariety;
  selected: boolean;
  onClick: (variety: IVariety) => void;
  onDeleted: (variety: IVariety) => void;
}

export const VarietyItem: React.FunctionComponent<IVarietyItemProps> = ({
  variety,
  selected,
  onClick,
  onDeleted
}) => {
  const { actions } = useAppState();

  return (
    <ListItem button selected={selected} onClick={() => onClick(variety)}>
      <ListItemText primary={variety.name} />
      <ListItemSecondaryAction>
        <DeleteButton
          onDelete={() => {
            onDeleted(variety);
            actions.deleteVariety(variety.id);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
