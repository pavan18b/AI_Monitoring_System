import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../slices/authSlice';
import axios from '../../axios';
import AuthLogin from './AuthLogin';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email required'),
      password: Yup.string().required('Password required'),
    }),
    onSubmit: async (values) => {
  try {
    const res = await axios.post('/users/auth', values);

    // ✅ SAVE TO REDUX
    dispatch(setCredentials(res.data));

    // ✅ SAVE TO LOCAL STORAGE (CRITICAL)
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    toast.success('Login successful');

    navigate('/dashboard');
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Login failed');
  }
},
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" mb={2}>
            Login
          </Typography>

          <AuthLogin formik={formik} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;