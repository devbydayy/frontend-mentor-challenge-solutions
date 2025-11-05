'use client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsive = (breakpoint: 'up' | 'down', key: 'sm' | 'md' | 'lg') => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints[breakpoint](key));
};
