import { Box, useMediaQuery, useTheme } from '@mui/material';

export const BannerDivider = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  return (
    <Box
      sx={{
        opacity: 0.4,
        backgroundImage: isDesktop
          ? 'linear-gradient(var(--slate-000) 33%, #00000000 0%)'
          : 'linear-gradient(to right, var(--slate-000) 33%, #00000000 0%)',
        backgroundPosition: isDesktop ? 'right' : 'bottom',
        backgroundSize: isDesktop ? '1px 7px' : '7px 1px',
        backgroundRepeat: isDesktop ? 'repeat-y' : 'repeat-x',
        width: isDesktop ? '1px' : '100%',
        height: isDesktop ? '100%' : '1px',
      }}
    />
  );
};
