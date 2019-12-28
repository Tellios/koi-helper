import * as React from "react";
import { IDisease } from "app/storage";
import { useAppState } from "app/state";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { DeleteButton } from "app/ui";

export interface IDiseaseItemProps {
  disease: IDisease;
  selected: boolean;
  onClick: (disease: IDisease) => void;
  onDeleted: (disease: IDisease) => void;
}

export const DiseaseItem: React.FunctionComponent<IDiseaseItemProps> = ({
  disease,
  selected,
  onClick,
  onDeleted
}) => {
  const { actions } = useAppState();

  return (
    <ListItem button selected={selected} onClick={() => onClick(disease)}>
      <ListItemText primary={disease.name} />
      <ListItemSecondaryAction>
        <DeleteButton
          onDelete={() => {
            onDeleted(disease);
            actions.deleteDisease(disease.id);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
