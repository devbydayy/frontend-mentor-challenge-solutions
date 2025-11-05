'use client';
import { useState } from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import MobileHeader from '@/components/layout/MobileHeader';

const drawerWidth = 280;
const minimizedDrawerWidth = 96;

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const currentDrawerWidth = isMinimized ? minimizedDrawerWidth : drawerWidth;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-Beige100)' }}>
      <CssBaseline />
  
      <MobileHeader />

      <Sidebar 
        isMinimized={isMinimized} 
        toggleMinimize={toggleMinimize} 
        drawerWidth={drawerWidth}
        minimizedDrawerWidth={minimizedDrawerWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          pb: { xs: '100px', md: 4 },
          transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          width: { 
            xs: '100%', 
            md: `calc(100% - ${currentDrawerWidth}px)` 
          },
        }}
      >
        <Toolbar sx={{ display: { md: 'none' } }} />
        
        {children}
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <BottomNav />
      </Box>
    </Box>
  )
}
