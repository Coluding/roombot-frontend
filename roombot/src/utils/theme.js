import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        color3: {
            100: "#cdcfd0",
            200: "#9c9fa1",
            300: "#6a7071",
            400: "#394042",
            500: "#071013",
            600: "#060d0f",
            700: "#040a0b",
            800: "#030608",
            900: "#010304"
        },
        color2: {
            100: "#d3f0f6",
    200: "#a7e1ed",
    300: "#7bd3e5",
    400: "#4fc4dc",
    500: "#23b5d3",
    600: "#1c91a9",
    700: "#156d7f",
    800: "#0e4854",
    900: "#07242a"
},
        color1: {
            100: "#e3eef2",
    200: "#c8dde4",
    300: "#accdd7",
    400: "#91bcc9",
    500: "#75abbc",
    600: "#5e8996",
    700: "#466771",
    800: "#2f444b",
    900: "#172226"
        },
        color4: {
            100: "#eceff1",
    200: "#dadfe4",
    300: "#c7ced6",
    400: "#b5bec9",
    500: "#a2aebb",
    600: "#828b96",
    700: "#616870",
    800: "#41464b",
    900: "#202325"
        },
        color5: {
          100: "#f9f9f9",
          200: "#f2f3f3",
          300: "#ececee",
          400: "#e5e6e8",
          500: "#dfe0e2",
          600: "#b2b3b5",
          700: "#868688",
          800: "#595a5a",
          900: "#2d2d2d"
        },
        grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0",
          },
          light_gray: {
            100: "#fcf8f8",
            200: "#faf0f1",
            300: "#f7e9e9",
            400: "#f5e1e2",
            500: "#f2dadb",
            600: "#c2aeaf",
            700: "#918383",
            800: "#615758",
            900: "#302c2c"
        },
        darkGrey: {
          100: "#cfd0d1",
          200: "#9fa1a3",
          300: "#707274",
          400: "#404346",
          500: "#101418",
          600: "#0d1013",
          700: "#0a0c0e",
          800: "#06080a",
          900: "#030405"
      },
          white: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff",
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        
      }
    : {
      color5: {
          100: "#cdcfd0",
          200: "#9c9fa1",
          300: "#6a7071",
          400: "#394042",
          500: "#071013",
          600: "#060d0f",
          700: "#040a0b",
          800: "#030608",
          900: "#010304"
      },
      color4: {
          100: "#d3f0f6",
  200: "#a7e1ed",
  300: "#7bd3e5",
  400: "#4fc4dc",
  500: "#23b5d3",
  600: "#1c91a9",
  700: "#156d7f",
  800: "#0e4854",
  900: "#07242a"
},
      color3: {
          100: "#e3eef2",
  200: "#c8dde4",
  300: "#accdd7",
  400: "#91bcc9",
  500: "#75abbc",
  600: "#5e8996",
  700: "#466771",
  800: "#2f444b",
  900: "#172226"
      },
      color2: {
          100: "#eceff1",
  200: "#dadfe4",
  300: "#c7ced6",
  400: "#b5bec9",
  500: "#a2aebb",
  600: "#828b96",
  700: "#616870",
  800: "#41464b",
  900: "#202325"
      },
      color1: {
        100: "#f9f9f9",
        200: "#f2f3f3",
        300: "#ececee",
        400: "#e5e6e8",
        500: "#dfe0e2",
        600: "#b2b3b5",
        700: "#868688",
        800: "#595a5a",
        900: "#2d2d2d"
      },
      grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        light_gray: {
          100: "#fcf8f8",
          200: "#faf0f1",
          300: "#f7e9e9",
          400: "#f5e1e2",
          500: "#f2dadb",
          600: "#c2aeaf",
          700: "#918383",
          800: "#615758",
          900: "#302c2c"
      },
      darkGrey: {
        100: "#cfd0d1",
        200: "#9fa1a3",
        300: "#707274",
        400: "#404346",
        500: "#101418",
        600: "#0d1013",
        700: "#0a0c0e",
        800: "#06080a",
        900: "#030405"
    },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
      },
      
    }
  )})

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "light" // object spread operator
        ? {
            // palette values for dark mode
            primary: {
              main: colors.color1[500],
            },
            secondary: {
              main: colors.color2[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.darkGrey[500],
            },
          }
        : {
            
            primary: {
              main: colors.color1[100],
            },
            secondary: {
              main: colors.color2[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.white[100],
            },
          }),
    },
    typography: {
      fontFamily: "bold",
      fontSize: 12,
      h1: {
        fontFamily: "bold",
        fontSize: 40,
      },
      h2: {
        fontFamily: "bold",
        fontSize: 32,
      },
      h3: {
        fontFamily: "bold",
        fontSize: 24,
      },
      h4: {
        fontFamily: "bold",
        fontSize: 20,
      },
      h5: {
        fontFamily:"bold",
        fontSize: 16,
      },
      h6: {
        fontFamily: "bold",
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      
      toggleColorMode: () =>{
      
        setMode((prev) => (prev === "light" ? "dark" : "light"))
        console.log(mode)
      },
        
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};