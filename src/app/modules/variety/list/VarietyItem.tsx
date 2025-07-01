import { useActions } from '@app/state';
import { IVariety } from '@shared/models';
import { DeleteButton } from '@app/ui';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';

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
  const actions = useActions();

  return (
    <ListItem
      secondaryAction={
        <DeleteButton
          onDelete={() => {
            onDeleted(variety);
            actions.deleteVariety(variety.id);
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
