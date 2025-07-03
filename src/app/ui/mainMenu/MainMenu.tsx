import { t } from '@app/i18n';
import { useActions, useAppState } from '@app/state';
import { BugReport, ChevronLeft, ChevronRight, Pets, Spa } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  Fade,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { ConditionalTooltip } from '../ConditionalTooltip';

interface IMenuItem {
  path: string;
  renderIcon: () => React.ReactElement;
  renderText: () => string;
}

const menuItems: IMenuItem[] = [
  {
    path: '/ponds',
    renderIcon: () => <Spa />,
    renderText: () => t.menu.main.ponds,
  },
  {
    path: '/varieties',
    renderIcon: () => <Pets />,
    renderText: () => t.menu.main.varieties,
  },
  {
    path: '/diseases',
    renderIcon: () => <BugReport />,
    renderText: () => t.menu.main.diseases,
  },
];

export const MainMenu: React.FunctionComponent = () => {
  const { appMenuOpen } = useAppState();
  const { appMenuToggleOpen } = useActions();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        flexShrink: 0,
      }}
      slotProps={{
        paper: {
          sx: {
            overflowX: 'hidden',
            width: appMenuOpen ? 240 : 60,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.short,
            }),
          },
        },
      }}
      variant="permanent"
    >
      <Box style={theme.mixins.toolbar} mt={1} />
      <List sx={{ whiteSpace: 'nowrap' }}>
        <ConditionalTooltip when={!appMenuOpen} title={t.menu.main.openMenu}>
          <ListItemButton onClick={appMenuToggleOpen} sx={{ height: 48 }}>
            <ListItemIcon>{appMenuOpen ? <ChevronLeft /> : <ChevronRight />}</ListItemIcon>
            <Fade in={appMenuOpen} appear={false}>
              <ListItemText primary={t.menu.main.closeMenu} />
            </Fade>
          </ListItemButton>
        </ConditionalTooltip>
      </List>

      <Divider />

      <List sx={{ whiteSpace: 'nowrap' }}>
        {menuItems.map((mi) => (
          <ConditionalTooltip key={mi.path} when={!appMenuOpen} title={mi.renderText()}>
            <ListItemButton onClick={() => navigate(mi.path)} sx={{ height: 48 }}>
              <ListItemIcon>{mi.renderIcon()}</ListItemIcon>
              <Fade in={appMenuOpen} appear={false}>
                <ListItemText primary={mi.renderText()} />
              </Fade>
            </ListItemButton>
          </ConditionalTooltip>
        ))}
      </List>
    </Drawer>
  );
};
