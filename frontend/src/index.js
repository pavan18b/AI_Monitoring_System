import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import { ThemeProvider, CssBaseline } from "@mui/material";
import glassTheme from "./theme/glassTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={glassTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);