import { TypographyOptions } from '@mui/material/styles/createTypography';

export const defaultFont = { fontFamily: "Roboto, 'Noto Sans Thai', sans-serif" };

export const typography: TypographyOptions = {
  fontFamily: "Roboto, 'Noto Sans Thai', sans-serif",
  title_M: {
    fontFamily: 'Open Sans, sans-serif, Noto Sans Thai',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '40px',
  },
  title_S: {
    fontFamily: 'Open Sans, sans-serif, Noto Sans Thai',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '30px',
  },
  body_XL: {
    ...defaultFont,
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
  },
  body_L: {
    ...defaultFont,
    fontSize: '17px',
    lineHeight: '32px',
  },
  body_L_B: {
    ...defaultFont,
    fontWeight: 700,
    fontSize: '17px',
    lineHeight: '32px',
  },
  body_M: {
    ...defaultFont,
    fontSize: '15px',
    lineHeight: '24px',
    fontFeatureSettings: "'clig' off, 'liga' off",
  },
  body_M_B: {
    ...defaultFont,
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '24px',
  },
  body_S: {
    ...defaultFont,
    fontSize: '14px',
    lineHeight: '20px',
  },
  body_S_B: {
    ...defaultFont,
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
  },
  body_XS: {
    ...defaultFont,
    fontSize: '13px',
    lineHeight: '18px',
  },
  body_XS_B: {
    ...defaultFont,
    fontWeight: 700,
    fontSize: '13px',
    lineHeight: '18px',
  },
};
