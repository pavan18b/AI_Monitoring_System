import { useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const sidebarWidth = "270px";

  // 🎨 IMPROVED PREMIUM SIDEBAR STYLE
  const sidebarStyle = {
    width: sidebarWidth,
    boxSizing: "border-box",

    // 🔥 DARK BLUE GRADIENT (BEST LOOK)
    background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",

    // 💎 GLASS EFFECT
    backdropFilter: "blur(16px)",

    // ✨ BORDER + SHADOW
    borderRight: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",

    // TEXT COLOR
    color: "#e2e8f0",
  };

  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{ sx: sidebarStyle }}
        >
          <Box sx={{ height: "100%" }}>
            {/* LOGO */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 3,
                py: 2,
                gap: 2,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Logo />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#38bdf8",
                  letterSpacing: "1px",
                }}
              >
                APS
              </Typography>
            </Box>

            {/* ITEMS */}
            <SidebarItems />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{ sx: sidebarStyle }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Logo />

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#38bdf8",
            ml: 1,
          }}
        >
          APS
        </Typography>
      </Box>

      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;