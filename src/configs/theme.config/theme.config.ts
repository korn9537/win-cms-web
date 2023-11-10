// 'use client';

// import { createTheme } from '@mui/material';

// declare module '@mui/material/styles' {
//   interface Palette {
//     deepBlue: Palette['primary'];
//     softBlue: Palette['primary'];
//     darkBlue: Palette['primary'];
//     neutralGray: Palette['primary'];
//     black: Palette['primary'];
//     red: Palette['primary'];
//     green: Palette['primary'];
//     black80: Palette['primary'];
//   }

//   interface PaletteOptions {
//     deepBlue?: PaletteOptions['primary'];
//     softBlue?: PaletteOptions['primary'];
//     darkBlue?: PaletteOptions['primary'];
//     neutralGray?: PaletteOptions['primary'];
//     black?: PaletteOptions['primary'];
//     red?: PaletteOptions['primary'];
//     green?: PaletteOptions['primary'];
//     black80?: PaletteOptions['primary'];
//   }

//   interface PaletteColor {
//     100?: string;
//     80?: string;
//     60?: string;
//     40?: string;
//     20?: string;
//     10?: string;
//   }

//   interface SimplePaletteColorOptions {
//     100?: string;
//     80?: string;
//     60?: string;
//     40?: string;
//     20?: string;
//     10?: string;
//   }
// }

// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     black80: true;
//   }
// }

// declare module '@mui/material/styles' {
//   interface TypographyVariants {
//     title_M: React.CSSProperties;
//     title_S: React.CSSProperties;
//     body_XL: React.CSSProperties;
//     body_L: React.CSSProperties;
//     body_L_B: React.CSSProperties;
//     body_M: React.CSSProperties;
//     body_M_B: React.CSSProperties;
//     body_S: React.CSSProperties;
//     body_S_B: React.CSSProperties;
//     body_XS: React.CSSProperties;
//     body_XS_B: React.CSSProperties;
//   }

//   // allow configuration using `createTheme`
//   interface TypographyVariantsOptions {
//     title_M?: React.CSSProperties;
//     title_S?: React.CSSProperties;
//     body_XL?: React.CSSProperties;
//     body_L?: React.CSSProperties;
//     body_L_B?: React.CSSProperties;
//     body_M?: React.CSSProperties;
//     body_M_B?: React.CSSProperties;
//     body_S?: React.CSSProperties;
//     body_S_B?: React.CSSProperties;
//     body_XS?: React.CSSProperties;
//     body_XS_B?: React.CSSProperties;
//   }
// }

// // Update the Typography's variant prop options
// declare module '@mui/material/Typography' {
//   interface TypographyPropsVariantOverrides {
//     title_M: true;
//     title_S: true;
//     body_XL: true;
//     body_L: true;
//     body_L_B: true;
//     body_M: true;
//     body_M_B: true;
//     body_S: true;
//     body_S_B: true;
//     body_XS: true;
//     body_XS_B: true;
//   }
// }

// const defaultFont = { fontFamily: "Roboto, 'Noto Sans Thai', sans-serif" };

// const typography = {
//   fontFamily: "Roboto, 'Noto Sans Thai', sans-serif",
//   title_M: {
//     fontFamily: 'Open Sans, sans-serif, Noto Sans Thai',
//     fontWeight: 700,
//     fontSize: '24px',
//     lineHeight: '40px',
//   },
//   title_S: {
//     fontFamily: 'Open Sans, sans-serif, Noto Sans Thai',
//     fontWeight: 700,
//     fontSize: '20px',
//     lineHeight: '30px',
//   },
//   body_XL: {
//     ...defaultFont,
//     fontWeight: 700,
//     fontSize: '20px',
//     lineHeight: '24px',
//   },
//   body_L: {
//     ...defaultFont,
//     fontSize: '17px',
//     lineHeight: '32px',
//   },
//   body_L_B: {
//     ...defaultFont,
//     fontWeight: 700,
//     fontSize: '17px',
//     lineHeight: '32px',
//   },
//   body_M: {
//     ...defaultFont,
//     fontSize: '15px',
//     lineHeight: '24px',
//   },
//   body_M_B: {
//     ...defaultFont,
//     fontWeight: 700,
//     fontSize: '15px',
//     lineHeight: '24px',
//   },
//   body_S: {
//     ...defaultFont,
//     fontSize: '14px',
//     lineHeight: '20px',
//   },
//   body_S_B: {
//     ...defaultFont,
//     fontWeight: 700,
//     fontSize: '14px',
//     lineHeight: '20px',
//   },
//   body_XS: {
//     ...defaultFont,
//     fontSize: '13px',
//     lineHeight: '18px',
//   },
//   body_XS_B: {
//     ...defaultFont,
//     fontWeight: 700,
//     fontSize: '13px',
//     lineHeight: '18px',
//   },
// };

// const palette = {
//   primary: {
//     main: '#3D71B8',
//     100: '#3D71B8',
//     80: '#6385C4',
//     60: '#869BD0',
//     40: '#AAB8DD',
//     20: '#D1D8EB',
//   },
//   deepBlue: {
//     main: '#153F7E',
//     100: '#153F7E',
//     80: '#466497',
//     60: '#869BD0',
//     40: '#A2B2CB',
//     20: '#D0DAE3',
//   },
//   softBlue: {
//     main: '#75A9F9',
//     100: '#75A9F9',
//     80: '#91BAFA',
//     60: '#ACCBFA',
//     40: '#C5DEFD',
//     20: '#E3EFFF',
//     10: '#F1F7FF',
//   },
//   darkBlue: {
//     main: '#263147',
//     100: '#263147',
//   },
//   neutralGray: {
//     main: '#8E8E8E',
//     100: '#8E8E8E',
//     80: '#A5A5A5',
//     60: '#BBBBBB',
//     40: '#D2D2D2',
//     20: '#E8E8E8',
//     10: '#F8F8F8',
//   },
//   black: {
//     main: '#000000',
//     100: '#000000',
//     80: '#333333',
//   },
//   black80: {
//     main: '#333333',
//     100: '#333333',
//   },
//   red: {
//     main: '#EC4E43',
//     100: '#EC4E43',
//   },
//   green: {
//     main: '#007565',
//     100: '#007565',
//     10: '#E4F8F6',
//   },
// };

// export const theme = createTheme({
//   palette: {
//     error: {
//       main: palette.red.main,
//     },
//     ...palette,
//   },
//   components: {},
//   typography,
// });
