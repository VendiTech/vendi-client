import { Box } from '@mui/material';

export const BannerDivider = () => {
  return (
    <Box
      sx={{
        opacity: 0.4,
        backgroundImage: {
          desktop: 'linear-gradient(var(--slate-000) 33%, #00000000 0%)',
          mobile:
            'linear-gradient(to right, var(--slate-000) 33%, #00000000 0%)',
        },
        backgroundPosition: {
          desktop: 'right',
          mobile: 'bottom',
        },
        backgroundSize: {
          desktop: '1px 7px',
          mobile: '7px 1px',
        },
        backgroundRepeat: {
          desktop: 'repeat-y',
          mobile: 'repeat-x',
        },
        width: {
          desktop: '1px',
          mobile: '100%',
        },
        height: {
          desktop: '100%',
          mobile: '1px',
        },
      }}
    />
  );
};
