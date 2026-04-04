import React from 'react';
import { Box, Card, Typography, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import AuthRegister from './AuthRegister';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from './../../slices/usersApiSlice';
import { setCredentials } from './../../slices/authSlice';
import Loader from './Loader';

const userValidationSchema = yup.object({
  name: yup.string().min(2).max(25).required('Please enter your name'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password must match'),
  role: yup.string().oneOf(['student', 'teacher']).required('Role is required'),
});

const initialUserValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  role: 'student',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      const { name, email, password, confirm_password, role } = values;

      if (password !== confirm_password) {
        toast.error('Passwords do not match');
        return;
      }

      try {
        const res = await register({ name, email, password, role }).unwrap();

        dispatch(setCredentials(res)); // optional

        toast.success('Registered successfully');

        navigate('/auth/login'); // ✅ redirect AFTER register
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <PageContainer title="Register">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Card sx={{ p: 3, width: 400 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Register
          </Typography>

          <AuthRegister formik={formik} />

          <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
            <Typography>Already have an account?</Typography>
            <Link to="/auth/login">Login</Link>
          </Stack>

          {isLoading && <Loader />}
        </Card>
      </Box>
    </PageContainer>
  );
};

export default Register;