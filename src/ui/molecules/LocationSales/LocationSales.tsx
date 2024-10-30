import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';

type Props = {
  percent: number;
  location: string;
  highlightOpacity: number;
};

export const LocationSales = (props: Props) => {
  const { percent, location, highlightOpacity } = props;

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Typography
        variant={'sm-regular'}
        color={'var(--slate-500)'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flex: '1 1 120px',
        }}>
        <Box
          sx={{
            width: '8px',
            height: '8px',
            borderRadius: '3px',
            background: 'var(--sky-500)',
            opacity: highlightOpacity,
          }}
        />
        {location}
      </Typography>

      <LinearProgress
        variant={'determinate'}
        value={percent}
        sx={{
          height: '6px',
          width: '100px',
          borderRadius: '3px',
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: 'var(--slate-100)',
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: '3px',
            backgroundColor: 'var(--sky-500)',
          },
        }}
      />

      <Typography
        variant={'sm-regular'}
        sx={{
          minWidth: '40px',
          textAlign: 'end',
          color: 'var(--slate-500)',
        }}>
        {Math.round(percent * 10) / 10}%
      </Typography>
    </Box>
  );
};
