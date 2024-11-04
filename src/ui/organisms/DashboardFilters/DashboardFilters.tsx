import { Box } from '@mui/material';
import { BaseSelect } from '@/ui/atoms/Select';
import EarthIcon from '@/assets/icons/Earth.svg';
import CalendarIcon from '@/assets/icons/Calendar.svg';

export const DashboardFilters = () => {
  return (
    <>
      <Box>
        <BaseSelect
          fullWidth
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--slate-400)',
                  pl: 1.5,
                }}>
                <EarthIcon width={16} height={16} />
              </Box>
            ),
          }}
          options={[
            { key: 'United Kingdom', value: 'United Kingdom' },
            { key: 'Liverpool', value: 'Liverpool' },
          ]}
          value={'United Kingdom'}
        />
      </Box>

      <Box>
        <BaseSelect
          fullWidth
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--slate-400)',
                  pl: 1.5,
                }}>
                <CalendarIcon width={14} height={16} />
              </Box>
            ),
          }}
          options={[
            { key: '1 month', value: '1 month' },
            { key: '1 year', value: '1 year' },
          ]}
          value={'1 month'}
        />
      </Box>
    </>
  );
};
