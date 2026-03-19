import { DeleteButton } from '@app/ui';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { IFish } from '@shared/models';
import * as React from 'react';
import { useFishStore } from '../fish-store';

export interface IFishItemProps {
  fish: IFish;
  selected: boolean;
  onClick: (fish: IFish) => void;
  onDeleted: (fish: IFish) => void;
}

export const FishItem: React.FunctionComponent<IFishItemProps> = ({
  fish,
  selected,
  onClick,
  onDeleted,
}) => {
  const { deleteFish } = useFishStore();

  return (
    <ListItem
      secondaryAction={
        <DeleteButton
          onDelete={() => {
            onDeleted(fish);
            deleteFish(fish);
          }}
        />
      }
    >
      <ListItemButton selected={selected} onClick={() => onClick(fish)}>
        <ListItemText primary={fish.name} />
      </ListItemButton>
    </ListItem>
  );
};
