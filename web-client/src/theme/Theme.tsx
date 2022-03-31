import React from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

const Theme = ({ children }: any) => {
  const themeLight: ThemeOptions = {
    palette: {
      primary: {
        main: "#7d80da",
        light: "#cfe8fc",
        dark: "#575998",
        contrastText: "#f3f4f6",
      },
      background: {
        default: "#f3f4f6",
        paper: "#ffffff",
      },
      error: {
        main: "#db2b39",
        light: "#e25560",
        dark: "#991e27",
        contrastText: "#f3f4f6",
      },
      warning: {
        main: "#fee440",
        light: "#fee966",
        dark: "#b19f2c",
        contrastText: "rgba(0,0,0,0.87)",
      },
      success: {
        main: "#08a045",
        light: "#39b36a",
        dark: "#057030",
        contrastText: "#f3f4f6",
      },
      text: {
        primary: "rgba(0,0,0,0.87)",
        secondary: "rgba(0,0,0,0.54)",
        disabled: "rgba(0,0,0,0.38)",
      },
      info: {
        main: "#2196f3",
        light: "#4dabf5",
        dark: "#1769aa",
        contrastText: "#f3f4f6",
      },
      divider: "rgba(0,0,0,0.12)",
    },
    typography: {
      h1: {
        fontSize: 32,
        fontWeight: 700,
        fontFamily: '"Open Sans", sans-serif',
      },
      h2: {
        fontSize: 30,
        fontWeight: 700,
        fontFamily: '"Open Sans", sans-serif',
      },
      h3: {
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 26,
        fontWeight: 700,
      },
      h4: {
        fontSize: 22,
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 700,
      },
      h5: {
        fontSize: 18,
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 700,
      },
      subtitle1: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: 16,
      },
      subtitle2: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: 14,
      },
      body1: {
        fontFamily: '"Helvetica", sans-serif',
        fontSize: 14,
        fontWeight: 400,
      },
      body2: {
        fontFamily: '"Helvetica", sans-serif',
        fontSize: 13,
        fontWeight: 400,
      },
      button: {
        fontFamily: '"Helvetica", sans-serif',
        fontSize: 14,
        fontWeight: 500,
      },
      caption: {
        fontFamily: '"Helvetica", sans-serif',
        fontSize: 11,
        fontWeight: 400,
      },
    },
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(themeLight)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Theme;
