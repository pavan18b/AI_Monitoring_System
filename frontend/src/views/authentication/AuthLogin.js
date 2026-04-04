import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  // 🔥 password toggle state
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <Stack>
          {/* EMAIL */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb="5px">
              Email
            </Typography>
            <CustomTextField
              id="email"
              name="email"
              variant="outlined"
              placeholder="Enter Your Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              required
              fullWidth
            />
          </Box>

          {/* PASSWORD */}
          <Box mt="25px">
            <Typography variant="subtitle1" fontWeight={600} mb="5px">
              Password
            </Typography>
            <CustomTextField
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'} // 👁️ toggle
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* OPTIONS */}
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>

            <Typography
              fontWeight="500"
              sx={{ color: 'primary.main' }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>

        {/* SUBMIT BUTTON */}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>

        {/* 🔥 REGISTER LINK */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;