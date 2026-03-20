import { t } from '@shared/i18n';
import { useStartupStore } from '@app/modules/userStartup';
import { app } from '@electron/remote';
import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';

export const ShowAppMenuButton: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { newFile, openExistingFile } = useStartupStore();
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
            newFile();
          }}
        >
          {t.menu.app.newFile}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/ponds`);
            openExistingFile();
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
