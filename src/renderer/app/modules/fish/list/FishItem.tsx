import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { IFish } from "app/storage";
import { DeleteButton } from "app/ui";
import { useAppState } from "app/state";

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
  onDeleted
}) => {
  const {
    actions: { deleteFish }
  } = useAppState();

  return (
    <ListItem button selected={selected} onClick={() => onClick(fish)}>
      <ListItemText primary={fish.name} />
      <ListItemSecondaryAction>
        <DeleteButton
          onDelete={() => {
            onDeleted(fish);
            deleteFish(fish);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
