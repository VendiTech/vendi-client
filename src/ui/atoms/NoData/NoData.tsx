import { Box, Typography } from '@mui/material';

export const NoData = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        flex: '1 1 auto',
      }}>
      <Typography
        variant={'h6'}
        sx={{
          fontWeight: 500,
          color: 'var(slate-900)',
        }}>
        No data yet
      </Typography>

      <Typography
        sx={{
          maxWidth: '268px',
          textAlign: 'center',
          color: 'var(slate-500)',
        }}>
        Unfortunately there’s not enough data to generate this graph.
      </Typography>
    </Box>
  );
};
