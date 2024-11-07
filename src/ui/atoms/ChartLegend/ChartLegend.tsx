import { Box, Typography } from '@mui/material';

type Props = {
  legend: {
    title: string;
    color: string;
  }[];
};

export const ChartLegend = ({ legend }: Props) => {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
      {legend.map((item) => (
        <Box
          key={item.title}
          sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Box
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '3px',
              backgroundColor: item.color,
            }}
          />

          <Typography variant={'sm-regular'} color={'var(--slate-500)'}>
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
