import { DeleteButton } from '@app/ui';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { IVariety } from '@shared/models';
import * as React from 'react';
import { useVarietyStore } from '../variety-store';

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
  onDeleted,
}) => {
  const { deleteVariety } = useVarietyStore();

  return (
    <ListItem
      secondaryAction={
        <DeleteButton
          onDelete={() => {
            onDeleted(variety);
            deleteVariety(variety.id);
          }}
        />
      }
    >
      <ListItemButton selected={selected} onClick={() => onClick(variety)}>
        <ListItemText primary={variety.name} />
      </ListItemButton>
    </ListItem>
  );
};
