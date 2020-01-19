import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import {
  BugReport,
  Pets,
  Spa,
  ChevronLeft,
  ChevronRight
} from "@material-ui/icons";
import clsx from "clsx";
import { t } from "app/i18n";
import * as React from "react";
import { Route } from "react-router";
import { useShellStyles } from "../useShellStyles";
import { ConditionalTooltip } from "../ConditionalTooltip";

const useStyles = makeStyles(() => ({
  drawer: {
    flexShrink: 0
  },
  drawerExpanded: {
    width: 240
  },
  drawerCollapsed: {
    width: 62,
    overflowX: "hidden"
  }
}));

interface IMenuItem {
  path: string;
  renderIcon: () => React.ReactElement;
  renderText: () => string;
}

const menuItems: IMenuItem[] = [
  {
    path: "/ponds",
    renderIcon: () => <Spa />,
    renderText: () => t.menu.main.ponds
  },
  {
    path: "/varieties",
    renderIcon: () => <Pets />,
    renderText: () => t.menu.main.varieties
  },
  {
    path: "/diseases",
    renderIcon: () => <BugReport />,
    renderText: () => t.menu.main.diseases
  }
];

export const MainMenu: React.FunctionComponent = () => {
  const classes = useStyles();
  const shellClasses = useShellStyles();
  const [expanded, setExpanded] = React.useState(true);

  const sizeClass = clsx({
    [classes.drawerExpanded]: expanded,
    [classes.drawerCollapsed]: !expanded
  });

  return (
    <Route
      render={({ history }) => (
        <Drawer
          className={clsx(classes.drawer, sizeClass)}
          classes={{
            paper: sizeClass
          }}
          variant="permanent"
        >
          <div className={shellClasses.toolbar} />
          <List>
            <ConditionalTooltip when={!expanded} title={t.menu.main.openMenu}>
              <ListItem button onClick={() => setExpanded(!expanded)}>
                <ListItemIcon>
                  {expanded ? <ChevronLeft /> : <ChevronRight />}
                </ListItemIcon>
                {expanded && <ListItemText primary={t.menu.main.closeMenu} />}
              </ListItem>
            </ConditionalTooltip>
          </List>

          <Divider />

          <List>
            {menuItems.map(mi => (
              <ConditionalTooltip
                key={mi.path}
                when={!expanded}
                title={mi.renderText()}
              >
                <ListItem button onClick={() => history.push(mi.path)}>
                  <ListItemIcon>{mi.renderIcon()}</ListItemIcon>
                  {expanded && <ListItemText primary={mi.renderText()} />}
                </ListItem>
              </ConditionalTooltip>
            ))}
          </List>
        </Drawer>
      )}
    />
  );
};
