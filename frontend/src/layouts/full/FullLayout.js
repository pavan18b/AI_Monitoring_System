import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const FullLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",

        // ✅ PREMIUM BACKGROUND
        background: `
          radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15), transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(99,102,241,0.15), transparent 40%),
          linear-gradient(135deg, #020617, #0f172a)
        `,

        color: "#e2e8f0", // ✅ FIXED COMMA ISSUE
      }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            maxWidth: "1200px",
            width: "100%",
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default FullLayout;