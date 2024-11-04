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
        height: '100%',
      }}>
      <Typography variant={'sm-medium'} color={'var(--slate-900)'} sx={{
        lineHeight: '21px',
      }}>
        No data yet
      </Typography>

      <Typography
        variant={'sm-regular'}
        color={'var(--slate-500)'}
        sx={{
          lineHeight: '21px',
          maxWidth: 268,
          textAlign: 'center'
        }}>
        Unfortunately there’s not enough data to generate this graph.
      </Typography>
    </Box>
  );
};
