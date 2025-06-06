import { t } from '@app/i18n';
import { BugReport, ChevronLeft, ChevronRight, Pets, Spa } from '@mui/icons-material';
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
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
    renderText: () => t.menu.main.ponds
  },
  {
    path: '/varieties',
    renderIcon: () => <Pets />,
    renderText: () => t.menu.main.varieties
  },
  {
    path: '/diseases',
    renderIcon: () => <BugReport />,
    renderText: () => t.menu.main.diseases
  }
];

export const MainMenu: React.FunctionComponent = () => {
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...(expanded ? { width: 240 } : { width: 62, overflowX: 'hidden' })
      }}
      variant="permanent"
    >
      <div style={theme.mixins.toolbar} />
      <List>
        <ConditionalTooltip when={!expanded} title={t.menu.main.openMenu}>
          <ListItemButton onClick={() => setExpanded(!expanded)}>
            <ListItemIcon>{expanded ? <ChevronLeft /> : <ChevronRight />}</ListItemIcon>
            {expanded && <ListItemText primary={t.menu.main.closeMenu} />}
          </ListItemButton>
        </ConditionalTooltip>
      </List>

      <Divider />

      <List>
        {menuItems.map((mi) => (
          <ConditionalTooltip key={mi.path} when={!expanded} title={mi.renderText()}>
            <ListItemButton onClick={() => navigate(mi.path)}>
              <ListItemIcon>{mi.renderIcon()}</ListItemIcon>
              {expanded && <ListItemText primary={mi.renderText()} />}
            </ListItemButton>
          </ConditionalTooltip>
        ))}
      </List>
    </Drawer>
  );
};
