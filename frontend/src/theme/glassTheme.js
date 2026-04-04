import { createTheme } from "@mui/material/styles";

const glassTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00c6ff",
    },
    text: {
      primary: "#ffffff", // ✅ WHITE TEXT
      secondary: "#94a3b8",
    },
    background: {
      default: "#0f172a",
      paper: "rgba(255,255,255,0.05)",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  shape: {
    borderRadius: 16,
  },

  // 🔥 GLOBAL INPUT FIX
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#ffffff", // ✅ typed text
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#94a3b8", // ✅ label color
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.2)",
          },
          "&:hover fieldset": {
            borderColor: "#38bdf8",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6366f1",
          },
        },
      },
    },
  },
});

export default glassTheme;