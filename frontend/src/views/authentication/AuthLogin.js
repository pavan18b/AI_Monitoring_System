import React, { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";

const AuthLogin = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: "16px",

        // 🔥 DARK CARD STYLE
        background: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",

        color: "#e2e8f0",
      }}
    >
      {title && (
        <Typography fontWeight="700" variant="h4" mb={2} color="#fff">
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
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#334155" },
                  "&:hover fieldset": { borderColor: "#6366f1" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                  },
                },
              }}
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
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              required
              fullWidth
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#334155" },
                  "&:hover fieldset": { borderColor: "#6366f1" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "#cbd5e1" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* OPTIONS */}
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked sx={{ color: "#6366f1" }} />}
                label="Remember this Device"
              />
            </FormGroup>

            <Typography
              fontWeight="500"
              sx={{ color: "#6366f1", cursor: "pointer" }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>

        {/* BUTTON */}
        <Box>
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{
              mt: 1,
              background: "#6366f1",
              fontWeight: "bold",
              "&:hover": {
                background: "#4f46e5",
              },
            }}
          >
            Sign In
          </Button>
        </Box>

        {/* REGISTER */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="#94a3b8">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </form>

      {subtitle}
    </Box>
  );
};

export default AuthLogin;