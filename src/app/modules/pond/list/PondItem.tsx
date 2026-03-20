import { t } from '@shared/i18n';
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
import { usePondStore } from '../pond-store';

export interface IPondListItemProps {
  pond: IPond;
}

export const PondItem: React.FunctionComponent<IPondListItemProps> = ({ pond }) => {
  const { deletePond, archivePond, unArchivePond } = usePondStore();
  const navigate = useNavigate();

  return (
    <ListItem
      secondaryAction={
        <>
          <DeleteButton onDelete={() => deletePond(pond)} />
          <IconButton
            title={t.common.toggleArchiveAction(pond.archived)}
            onClick={() => (pond.archived ? unArchivePond(pond) : archivePond(pond))}
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
