import React, { useState } from "react";
import axios from "../../axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/users/auth", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* LOGIN CARD */}
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: 350,
          borderRadius: "16px",
          backdropFilter: "blur(20px)",
          background: "rgba(30, 41, 59, 0.8)",
          boxShadow: "0 0 30px rgba(99,102,241,0.3)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#38bdf8", fontWeight: "bold" }}
        >
          Login
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#334155" },
                "&:hover fieldset": { borderColor: "#6366f1" },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                  boxShadow: "0 0 8px #6366f1",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#334155" },
                "&:hover fieldset": { borderColor: "#6366f1" },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                  boxShadow: "0 0 8px #6366f1",
                },
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              background: "#6366f1",
              fontWeight: "bold",
              "&:hover": {
                background: "#4f46e5",
                boxShadow: "0 0 12px #6366f1",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;