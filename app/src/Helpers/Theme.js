import { createTheme, responsiveFontSizes } from "@mui/material/styles";

//http://html-color.org/pt/0F0000

const defaultThemeOptions = {
  palette: {
    common: {
      coffe: "#0F0000",
    },
    primary: {
      main: "#0E0700",
      light: "#1D0000",
      dark: "#0F0000",
    },
    secondary: {
      main: "#00877A",
      light: "#00BDA9",
      dark: "#003630",
    },
    error: {
      main: "#E50000",
      dark: "#930000",
      light: "#FF0000",
    },
    warning: {
      main: "#F58220",
      light: "#FC8821",
      dark: "#BB6518",
    },
    success: {
      main: "#0B9F00",
      light: "#0EC500",
      dark: "#00473E",
    },
    dropzone: {
      grey: "#EEEEEE",
      lighGrey: "#BDBDBD",
      grey98: "#FAFAFA",
    },
  },
};

let _theme = createTheme(defaultThemeOptions);
_theme = responsiveFontSizes(_theme);

export const Theme = _theme;
