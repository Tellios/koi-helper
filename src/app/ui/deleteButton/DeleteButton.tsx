import { t } from '@shared/i18n';
import { Cancel, Delete, DeleteForever } from '@mui/icons-material';
import { Button, IconButton, Popover, Stack, SxProps, Theme } from '@mui/material';
import * as React from 'react';

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
  onDelete,
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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack direction="row" gap={1} p={1}>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteForever />}
          >
            {t.common.deleteAction}
          </Button>
          <Button
            onClick={() => setDeletePopoverAnchor(null)}
            variant="outlined"
            startIcon={<Cancel />}
          >
            {t.common.cancelAction}
          </Button>
        </Stack>
      </Popover>
    </>
  );
};
