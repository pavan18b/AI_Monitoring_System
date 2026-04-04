import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    "& .MuiInputBase-input": {
      color: theme.palette.text.primary, // ✅ TEXT FIX
    },

    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary, // ✅ LABEL FIX
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.2)",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
      },
    },

    "& .MuiSvgIcon-root": {
      color: "#ffffff", // dropdown arrow
    },

    "& .MuiOutlinedInput-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  })
);

export default CustomTextField;