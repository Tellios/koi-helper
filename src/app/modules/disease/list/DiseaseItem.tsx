import { useActions } from '@app/state';
import { IDisease } from '@app/storage';
import { DeleteButton } from '@app/ui';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';

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
  onDeleted,
}) => {
  const actions = useActions();

  return (
    <ListItem
      secondaryAction={
        <DeleteButton
          onDelete={() => {
            onDeleted(disease);
            actions.deleteDisease(disease.id);
          }}
        />
      }
    >
      <ListItemButton selected={selected} onClick={() => onClick(disease)}>
        <ListItemText primary={disease.name} />
      </ListItemButton>
    </ListItem>
  );
};
