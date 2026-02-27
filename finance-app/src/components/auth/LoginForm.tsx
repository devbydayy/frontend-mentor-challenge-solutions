'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import Image from 'next/image';
import { LoginSchema, LoginSchemaType } from '@/lib/validation/loginSchema';

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginSchemaType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("FORM SUBMITTED", values);
      setError(null);

      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      setSubmitting(false);

      if (result?.ok) {
        router.push('/overview');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        disabled={formik.isSubmitting}
      />

      <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        disabled={formik.isSubmitting}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                <Image
                  src={
                    showPassword
                      ? '/images/icon-hide-password.svg'
                      : '/images/icon-show-password.svg'
                  }
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  width={24}
                  height={24}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={formik.isSubmitting}
        sx={{
          py: 1.5,
          backgroundColor: 'var(--color-Grey900)',
          color: 'var(--color-White)',
          '&:hover': { backgroundColor: 'var(--color-Grey500)' },
          '&:disabled': { backgroundColor: 'var(--color-Grey100)' },
        }}
      >
        {formik.isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
