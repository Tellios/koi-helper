import { t } from '@app/i18n';
import { useAppState } from '@app/state';
import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { app } from 'electron';
import * as React from 'react';
import { useNavigate } from 'react-router';

export const ShowAppMenuButton: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { actions } = useAppState();
  const navigate = useNavigate();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-controls="app-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="app-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/ponds`);
            actions.newFile();
          }}
        >
          {t.menu.app.newFile}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/ponds`);
            actions.openExistingFile();
          }}
        >
          {t.menu.app.openFile}
        </MenuItem>
        <MenuItem
          onClick={() => {
            app.quit();
          }}
        >
          {t.menu.app.exit}
        </MenuItem>
      </Menu>
    </>
  );
};
