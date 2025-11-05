'use client';
import { Box, Button, Paper, TextField, Typography, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        backgroundColor: 'var(--color-Beige100)',
      }}
    >
      
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-Grey900)',
          py: 2,
        }}
      >
        <Image
          src="/images/logo-large.svg"
          alt="Finance App Logo"
          width={120}
          height={30}
          priority
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '700px' },
          display: { xs: 'none', md: 'flex' },
          flexShrink: 0,
          position: 'relative',
          p: 0,
          minHeight: { xs: '40vh', md: 'auto' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '3%',
            transform: 'translateY(-50%)',
            width: '78%',
            height: '95%',
            overflow: 'hidden',
            backgroundColor: 'var(--color-Grey900)',
            borderRadius: { xs: 0, md: '15px' },
          }}
        >
          <Image
            src="/images/illustration-authentication.svg"
            alt="Financial illustration"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '9%',
            zIndex: 1,
            color: 'var(--color-White)',
            maxWidth: 460,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '90%',
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ pointerEvents: 'auto' }}>
            <Image src="/images/logo-large.svg" alt="Finance Logo" width={150} height={40} />
          </Box>

          <Box sx={{ pointerEvents: 'auto' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Keep track of your money and save for your future
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Personal finance app puts you in control of your spending. Track transactions,
              set budgets, and add to savings pots easily.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '700px' },
          display: 'flex',
          flexDirection: 'column',  
          justifyContent: { xs: 'center', md: 'center' },
          alignItems: { xs: 'flex-start', md: 'center' }, 
          p: { xs: 2, md: 4 },
          flexShrink: 0,
          minHeight: { xs: 'calc(100vh - 80px)', md: 'auto' },
          ml: { md: '-20px' },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '10px',
            maxWidth: 550,
            width: '100%',
            backgroundColor: 'var(--color-White)',
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Login
          </Typography>

          <LoginForm />

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            Need to create an account?{' '}
            <MuiLink
              component={Link}
              href="/sign-up"
              sx={{ color: 'var(--color-Green)', textDecoration: 'underline' }}
            >
              Sign Up
            </MuiLink>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            Just browsing?{' '}
            <MuiLink
              component={Link}
              href="/overview"
              sx={{ color: 'var(--color-Green)', textDecoration: 'underline' }}
            >
              Login with demo
            </MuiLink>
          </Typography>
        </Paper>
        <div className="attribution"
        style={{
        textAlign: 'center',
        marginTop: '2rem',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '0.875rem',
      }}
      >
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">DevbyDay</a>.
      </div>
      </Box>
    </Box>
  );
};

export default LoginPage;

