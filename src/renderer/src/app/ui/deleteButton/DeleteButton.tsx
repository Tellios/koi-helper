import * as React from 'react';
import { Popover, Button, IconButton, SxProps, Theme } from '@mui/material';
import { Delete, DeleteForever, Cancel } from '@mui/icons-material';
import { t } from '@app/i18n';

export interface IDeleteButtonProps {
  renderButton?: (onClick: (e: React.MouseEvent) => void, sx?: SxProps<Theme>) => React.ReactNode;
  sx?: SxProps<Theme>;
  onDelete: () => void;
}

export const DeleteButton: React.FunctionComponent<IDeleteButtonProps> = ({
  renderButton = (onClick, sx) => (
    <IconButton title={t.common.deleteAction} sx={sx} onClick={onClick}>
      <Delete />
    </IconButton>
  ),
  sx,
  onDelete
}) => {
  const [deletePopoverAnchor, setDeletePopoverAnchor] = React.useState<Element | null>(null);

  const handleDelete = () => {
    setDeletePopoverAnchor(null);
    onDelete();
  };

  return (
    <>
      {renderButton((e) => setDeletePopoverAnchor(e.currentTarget), sx)}
      <Popover
        anchorEl={deletePopoverAnchor}
        open={Boolean(deletePopoverAnchor)}
        onClose={() => setDeletePopoverAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Button
          onClick={handleDelete}
          sx={{
            p: 2,
            m: 1
          }}
        >
          <DeleteForever />
          {t.common.deleteAction}
        </Button>
        <Button
          onClick={() => setDeletePopoverAnchor(null)}
          sx={{
            p: 2,
            m: 1
          }}
        >
          <Cancel />
          {t.common.cancelAction}
        </Button>
      </Popover>
    </>
  );
};
