"use client";

import { createTheme } from "@mui/material";
import { palette } from "./palette.theme";
import { typography } from "./typography.theme";
import { componentConfig } from "./component.theme";

declare module "@mui/material/styles" {
  interface Palette {
    deepBlue: Palette["primary"];
    softBlue: Palette["primary"];
    darkBlue: Palette["primary"];
    neutralGray: Palette["primary"];
    black: Palette["primary"];
    red: Palette["primary"];
    green: Palette["primary"];
    black80: Palette["primary"];
  }

  interface PaletteOptions {
    deepBlue?: PaletteOptions["primary"];
    softBlue?: PaletteOptions["primary"];
    darkBlue?: PaletteOptions["primary"];
    neutralGray?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    red?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    black80?: PaletteOptions["primary"];
  }

  interface PaletteColor {
    100?: string;
    80?: string;
    60?: string;
    40?: string;
    20?: string;
    10?: string;
  }

  interface SimplePaletteColorOptions {
    100?: string;
    80?: string;
    60?: string;
    40?: string;
    20?: string;
    10?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    black80: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    black80: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    green: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title_M: React.CSSProperties;
    title_S: React.CSSProperties;
    body_XL: React.CSSProperties;
    body_L: React.CSSProperties;
    body_L_B: React.CSSProperties;
    body_M: React.CSSProperties;
    body_M_B: React.CSSProperties;
    body_S: React.CSSProperties;
    body_S_B: React.CSSProperties;
    body_XS: React.CSSProperties;
    body_XS_B: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title_M?: React.CSSProperties;
    title_S?: React.CSSProperties;
    body_XL?: React.CSSProperties;
    body_L?: React.CSSProperties;
    body_L_B?: React.CSSProperties;
    body_M?: React.CSSProperties;
    body_M_B?: React.CSSProperties;
    body_S?: React.CSSProperties;
    body_S_B?: React.CSSProperties;
    body_XS?: React.CSSProperties;
    body_XS_B?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title_M: true;
    title_S: true;
    body_XL: true;
    body_L: true;
    body_L_B: true;
    body_M: true;
    body_M_B: true;
    body_S: true;
    body_S_B: true;
    body_XS: true;
    body_XS_B: true;
  }
}

export default createTheme({
  palette: palette,
  components: componentConfig,
  typography: typography
});
