import { t } from '@app/i18n';
import { useActions, useAppState } from '@app/state';
import { ChevronRight, Medication } from '@mui/icons-material';
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
import { motion } from 'motion/react';
import * as React from 'react';
import { GiCirclingFish, GiWaterfall } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router';

interface IMenuItem {
  path: string;
  renderIcon: () => React.ReactElement;
  renderText: () => string;
}

const menuItems: IMenuItem[] = [
  {
    path: '/ponds',
    renderIcon: () => <GiWaterfall size={35} />,
    renderText: () => t.menu.main.ponds,
  },
  {
    path: '/varieties',
    renderIcon: () => <GiCirclingFish size={35} />,
    renderText: () => t.menu.main.varieties,
  },
  {
    path: '/diseases',
    renderIcon: () => <Medication fontSize="large" />,
    renderText: () => t.menu.main.diseases,
  },
];

const MotionChevron = motion.create(ChevronRight);

export const MainMenu: React.FunctionComponent = () => {
  const { appMenuOpen } = useAppState();
  const { appMenuToggleOpen } = useActions();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  return (
    <Drawer
      sx={{
        flexShrink: 0,
      }}
      slotProps={{
        paper: {
          sx: {
            overflowX: 'hidden',
            width: appMenuOpen ? 280 : 70,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.short,
            }),
          },
        },
      }}
      variant="permanent"
    >
      <Box style={theme.mixins.toolbar as React.CSSProperties} mt={1} />
      <List sx={{ whiteSpace: 'nowrap' }}>
        <ListItemButton
          onClick={appMenuToggleOpen}
          sx={{
            mx: 1,
            borderRadius: 1,

            paddingLeft: appMenuOpen ? undefined : 1,

            height: 48,

            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.short,
            }),
          }}
        >
          <ListItemIcon>
            <MotionChevron
              animate={{
                transform: appMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              fontSize="large"
            />
          </ListItemIcon>
          <Fade in={appMenuOpen} appear={false}>
            <ListItemText primary={t.menu.main.closeMenu} />
          </Fade>
        </ListItemButton>
      </List>

      <Divider />

      <List sx={{ whiteSpace: 'nowrap' }}>
        {menuItems.map((mi) => {
          const selected = location.pathname.startsWith(mi.path);

          return (
            <ListItemButton
              key={mi.path}
              onClick={() => navigate(mi.path)}
              selected={selected}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 1,

                paddingLeft: appMenuOpen ? undefined : 1,

                height: 48,
                color: selected ? theme.palette.primary.main : undefined,

                transition: theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  color: selected ? theme.palette.primary.main : undefined,
                }}
              >
                {mi.renderIcon()}
              </ListItemIcon>
              <Fade in={appMenuOpen} appear={false}>
                <ListItemText primary={mi.renderText()} />
              </Fade>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};
