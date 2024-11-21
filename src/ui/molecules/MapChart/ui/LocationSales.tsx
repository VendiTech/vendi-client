import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { RegionData } from '../types';
import { RegionOpacity } from '../helpers/get-region-opacity';

type Props = {
  regionData: RegionData;
  total: number;
  isSelected: boolean;
  onSelect: () => void;
  getRegionOpacity: () => number
};

export const LocationSales = (props: Props) => {
  const { regionData, total, isSelected, onSelect, getRegionOpacity } = props;

  const percent = regionData.value / total * 100;

  return (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', cursor: 'pointer' }}
      onClick={onSelect}>
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
            minWidth: '8px',
            height: '8px',
            borderRadius: '3px',
            background: isSelected ? 'var(--pink-300)' : 'var(--sky-500)',
            opacity: isSelected ? RegionOpacity.Max : getRegionOpacity(),
          }}
        />
        {regionData.name}
      </Typography>

      <LinearProgress
        variant={'determinate'}
        value={percent}
        sx={{
          height: '6px',
          width: '80px',
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
        {percent.toFixed(1)}%
      </Typography>
    </Box>
  );
};
