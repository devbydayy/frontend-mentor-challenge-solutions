'use client';
import {
  Drawer,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { text: 'Overview', href: '/overview', iconSrc: '/images/icon-nav-overview.svg' },
  { text: 'Transactions', href: '/transactions', iconSrc: '/images/icon-nav-transactions.svg' },
  { text: 'Budgets', href: '/budgets', iconSrc: '/images/icon-nav-budgets.svg' },
  { text: 'Pots', href: '/pots', iconSrc: '/images/icon-nav-pots.svg' },
  { text: 'Recurring Bills', href: '/recurring-bills', iconSrc: '/images/icon-nav-recurring-bills.svg' },
];

interface SidebarProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  drawerWidth: number;
  minimizedDrawerWidth: number;
}

const HIGHLIGHT_INSET = '0.6rem';

export const Sidebar = ({
  isMinimized,
  toggleMinimize,
  drawerWidth,
  minimizedDrawerWidth,
}: SidebarProps) => {
  const pathname = usePathname();
  const currentDrawerWidth = isMinimized ? minimizedDrawerWidth : drawerWidth;
  const minimizeIcon = isMinimized
    ? '/images/icon-caret-right.svg'
    : '/images/icon-minimize-menu.svg';

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: currentDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: currentDrawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'var(--color-Grey900)',
          color: 'var(--color-Grey500)',
          borderRight: 'none',
          p: '1rem',
          overflowX: 'hidden',
          borderRadius: '0 20px 20px 0',
          transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1)',
        },
      }}
    >
      <Toolbar sx={{ mb: 2, justifyContent: isMinimized ? 'center' : 'flex-start' }}>
        <Image
          src={isMinimized ? '/images/logo-small.svg' : '/images/logo-large.svg'}
          alt="Finance App Logo"
          width={isMinimized ? 32 : 138}
          height={32}
        />
      </Toolbar>

      <List>
        {navItems.map((item) => {
          const isActive =
            item.href === '/overview'
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NextLink}
                href={item.href}
                selected={isActive}
                title={isMinimized ? item.text : ''}
                sx={{
                  position: 'relative',
                  ml: '-1rem',
                  width: '100%',
                  height: 48,
                  py: 0,
                  px: isMinimized ? 6 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isMinimized ? 'center' : 'flex-start',
                  borderRadius: '0 10px 10px 0',
                  color: isActive ? 'var(--color-Green)' : 'var(--color-Grey500)',
                  transition: 'color 0.2s ease',

                  '&:hover .hover-bg': {
                    opacity: 1,
                  },
                  '&:hover': {
                    color: isActive ? 'var(--color-Green)' : 'var(--color-White)',
                  },
                }}
              >
                <Box
                  className="hover-bg"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: HIGHLIGHT_INSET,
                    top: 0,
                    bottom: 0,
                    borderRadius: '0 10px 10px 0',
                    backgroundColor: isActive
                      ? 'var(--color-White)'
                      : 'rgba(255,255,255,0.06)',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    zIndex: 0,
                  }}
                />

                {isActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      backgroundColor: 'var(--color-Green)',
                      zIndex: 1,
                    }}
                  />
                )}

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    ml: isMinimized ? 0 : 3,
                    mr: isMinimized ? 0 : 2,
                    justifyContent: 'center',
                    color: 'inherit',
                    zIndex: 2,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 24,
                      mask: `url(${item.iconSrc}) no-repeat center / contain`,
                      WebkitMask: `url(${item.iconSrc}) no-repeat center / contain`,
                      backgroundColor: 'currentColor',
                      transition: 'background-color 0.2s ease',
                    }}
                  />
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: isMinimized ? 0 : 1,
                    transition: 'opacity 0.2s',
                    mr: 2,
                    zIndex: 2,
                    color: isActive ? 'var(--color-Green)' : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={toggleMinimize}
            title={isMinimized ? 'Expand Menu' : 'Minimize Menu'}
            sx={{
              position: 'relative',
              ml: '-1rem',
              width: '100%',
              height: 48,
              py: 0,
              px: isMinimized ? 6 : 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMinimized ? 'center' : 'flex-start',
              borderRadius: '0 10px 10px 0',
              color: 'var(--color-Grey500)',
              transition: 'color 0.2s ease',

              '&:hover .hover-bg': {
                opacity: 1,
              },
              '&:hover': {
                color: 'var(--color-White)',
              },
            }}
          >
            <Box
              className="hover-bg"
              sx={{
                position: 'absolute',
                left: 0,
                right: HIGHLIGHT_INSET,
                top: 0,
                bottom: 0,
                borderRadius: '0 10px 10px 0',
                backgroundColor: 'rgba(255,255,255,0.06)',
                opacity: 0,
                transition: 'opacity 0.2s ease',
                zIndex: 0,
              }}
            />

            <ListItemIcon
              sx={{
                minWidth: 0,
                ml: isMinimized ? 0 : 3,
                mr: isMinimized ? 0 : 2,
                justifyContent: 'center',
                color: 'inherit',
                zIndex: 2,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 24,
                  height: 24,
                  mask: `url(${minimizeIcon}) no-repeat center / contain`,
                  WebkitMask: `url(${minimizeIcon}) no-repeat center / contain`,
                  backgroundColor: 'currentColor',
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Minimize Menu"
              sx={{
                opacity: isMinimized ? 0 : 1,
                transition: 'opacity 0.2s',
                mr: 2,
                zIndex: 2,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
