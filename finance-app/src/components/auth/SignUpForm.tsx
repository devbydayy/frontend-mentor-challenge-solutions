'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export const SignUpForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (res.ok) {
          router.push('/login');
        } else {
          setStatus(data.error || 'Registration failed');
        }
      } catch (error) {
        setStatus('Network error. Is the server running?');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.status && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formik.status}
        </Alert>
      )}

      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Full Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        fullWidth
        margin="normal"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        fullWidth
        margin="normal"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <TextField
        fullWidth
        margin="normal"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword &&
          formik.errors.confirmPassword
        }
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{
          mt: 2,
          py: 1.5,
          backgroundColor: 'var(--color-Grey900)',
          '&:hover': {
            backgroundColor: 'var(--color-Grey500)',
          },
        }}
      >
        {formik.isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </form>
  );
};