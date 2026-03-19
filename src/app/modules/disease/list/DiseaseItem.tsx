import { DeleteButton } from '@app/ui';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { IDisease } from '@shared/models';
import * as React from 'react';
import { useDiseaseStore } from '../disease-store';

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
  const { deleteDisease } = useDiseaseStore();

  return (
    <ListItem
      secondaryAction={
        <DeleteButton
          onDelete={() => {
            onDeleted(disease);
            deleteDisease(disease.id);
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
