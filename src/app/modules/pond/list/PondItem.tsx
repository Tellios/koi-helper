import { t } from '@app/i18n';
import { useActions } from '@app/state';
import { DeleteButton } from '@app/ui';
import { Archive, Unarchive } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { IPond } from '@shared/models';
import * as React from 'react';
import { useNavigate } from 'react-router';

export interface IPondListItemProps {
  pond: IPond;
}

export const PondItem: React.FunctionComponent<IPondListItemProps> = ({ pond }) => {
  const actions = useActions();
  const navigate = useNavigate();

  return (
    <ListItem
      secondaryAction={
        <>
          <DeleteButton onDelete={() => actions.deletePond(pond)} />
          <IconButton
            title={t.common.toggleArchiveAction(pond.archived)}
            onClick={() =>
              pond.archived ? actions.unArchivePond(pond) : actions.archivePond(pond)
            }
          >
            {pond.archived ? <Unarchive /> : <Archive />}
          </IconButton>
        </>
      }
    >
      <ListItemButton onClick={() => navigate(`/ponds/${pond.id}`)}>
        <ListItemAvatar>
          <Avatar alt={pond.name}>{pond.name.at(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={pond.name}
          secondary={`${t.pond.volumeLabel}: ${pond.volume}, ${t.pond.depthLabel}: ${pond.depth}`}
        />
      </ListItemButton>
    </ListItem>
  );
};
