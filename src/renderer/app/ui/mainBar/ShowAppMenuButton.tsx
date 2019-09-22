import * as React from "react";
import { remote } from "electron";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { t } from "app/i18n";
import { useAppState } from "app/state";
import { Route } from "react-router";

export const ShowAppMenuButton: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { actions } = useAppState();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Route
      render={({ history }) => (
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
                history.replace(`/ponds`);
                actions.newFile();
              }}
            >
              {t.menu.app.newFile}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                history.replace(`/ponds`);
                actions.openFile();
              }}
            >
              {t.menu.app.openFile}
            </MenuItem>
            <MenuItem
              onClick={() => {
                remote.getCurrentWindow().close();
              }}
            >
              {t.menu.app.exit}
            </MenuItem>
          </Menu>
        </>
      )}
    ></Route>
  );
};
