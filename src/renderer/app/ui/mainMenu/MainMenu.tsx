import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { BugReport, Pets, Spa } from "@material-ui/icons";
import { t } from "app/i18n";
import * as React from "react";
import { useShellStyles } from "../useShellStyles";
import { Route } from "react-router";

export const MainMenu: React.FunctionComponent = () => {
  const classes = useShellStyles();

  return (
    <Route
      render={({ history }) => (
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button onClick={() => history.push(`/ponds`)}>
              <ListItemIcon>
                <Spa />
              </ListItemIcon>
              <ListItemText primary={t.menu.ponds} />
            </ListItem>
            <ListItem button onClick={() => history.push(`/varieties`)}>
              <ListItemIcon>
                <Pets />
              </ListItemIcon>
              <ListItemText primary={t.menu.varieties} />
            </ListItem>
            <ListItem button onClick={() => history.push(`/diseases`)}>
              <ListItemIcon>
                <BugReport />
              </ListItemIcon>
              <ListItemText primary={t.menu.diseases} />
            </ListItem>
          </List>
        </Drawer>
      )}
    />
  );
};
