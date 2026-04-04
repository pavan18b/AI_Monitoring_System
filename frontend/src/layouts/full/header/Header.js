import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/slices/authSlice";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 🔥 LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/auth/login");
  };

  // 🔥 PROFILE
  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar>
        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: "1px",
          }}
        >
          AI Proctoring System
        </Typography>

        {/* USER NAME */}
        {userInfo && (
          <Box mr={2}>
            <Typography
              variant="body2"
              sx={{
                color: "#cbd5e1",
                fontWeight: 500,
              }}
            >
              {userInfo.name}
            </Typography>
          </Box>
        )}

        {/* AVATAR */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar
            sx={{
              background: "linear-gradient(135deg,#00c6ff,#0072ff)",
              fontWeight: "bold",
            }}
          >
            {userInfo?.name?.charAt(0)}
          </Avatar>
        </IconButton>

        {/* DROPDOWN MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff",
            },
          }}
        >
          <MenuItem
            onClick={handleProfile}
            sx={{
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            sx={{
              "&:hover": {
                background: "rgba(255,0,0,0.2)",
              },
              color: "#ff4d4d",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;