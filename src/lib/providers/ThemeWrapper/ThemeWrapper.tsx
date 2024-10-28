'use client';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    '3xl-medium': true;
    '2xl-medium': true;
    'lg-medium': true;
    'base-medium': true;
    'base-regular': true;
    'sm-semibold': true;
    'sm-medium': true;
    'sm-regular': true;
    'xs-semibold': true;
    'xs-medium': true;
    'xs-regular': true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 375,
      desktop: 768,
    },
  },
  typography: {
    fontFamily: 'var(--font-poppins)',
    allVariants: { margin: 0 },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: '3xl-medium' },
          style: { font: 'var(--3xl-medium)' },
        },
        {
          props: { variant: '2xl-medium' },
          style: { font: 'var(--2xl-medium)' },
        },
        {
          props: { variant: 'base-medium' },
          style: { font: 'var(--base-medium)' },
        },
        {
          props: { variant: 'base-regular' },
          style: { font: 'var(--base-regular)' },
        },
        {
          props: { variant: 'lg-medium' },
          style: { font: 'var(--lg-medium)' },
        },
        {
          props: { variant: 'sm-medium' },
          style: { font: 'var(--sm-medium)' },
        },
        {
          props: { variant: 'sm-regular' },
          style: { font: 'var(--sm-regular)' },
        },
        {
          props: { variant: 'sm-semibold' },
          style: { font: 'var(--sm-semibold)' },
        },
        {
          props: { variant: 'xs-regular' },
          style: { font: 'var(--xs-regular)' },
        },
        {
          props: { variant: 'xs-semibold' },
          style: { font: 'var(--xs-semibold)' },
        },
        {
          props: { variant: 'xs-medium' },
          style: { font: 'var(--xs-medium)' },
        },
      ],
    },
  },
});

export const ThemeWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
