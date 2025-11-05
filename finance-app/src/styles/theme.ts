'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#201F24',
    },
    secondary: {
      main: '#277C78',
    },
    background: {
      default: '#F8F4F0',
      paper: '#FFFFFF',
    },
    text: {
        primary: '#201F24',
        secondary: '#696868',
    }
  },
  typography: {
    fontFamily: 'Public Sans, sans-serif',
    h4: {
        fontSize: 'var(--font-size-32)',
        fontWeight: 700,
    },
    h5: {
        fontSize: 'var(--font-size-20)',
        fontWeight: 700,
    },
    body1: {
        fontSize: 'var(--font-size-16)',
    },
     body2: {
        fontSize: 'var(--font-size-14)',
    },
     caption: {
        fontSize: 'var(--font-size-12)',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: '20px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
            }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: '10px',
            }
        }
    }
  },
});
