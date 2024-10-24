import { Avatar, Box, Typography } from '@mui/material';
import { Activity } from '../types';
import { parseDate } from '@/lib/helpers/parse-date';

export const ActivityItem = (props: Activity) => {
  const { text, username, date } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: '12px 8px',
        '&:not(:last-child)': {
          borderBottom: '1px solid var(--slate-200)',
        },
      }}>
      <Avatar
        sx={{ bgcolor: 'var(--slate-100)', width: '32px', height: '32px' }}
        src={'https://ui-avatars.com/api/?name=John+Doe'}
      />

      <Box>
        <Typography variant={'sm-regular'}>
          <Typography variant={'sm-semibold'}>{username} </Typography>
          {text}
        </Typography>

        <Typography
          sx={{ display: 'block', lineHeight: '21px' }}
          variant={'sm-regular'}
          color={'var(--slate-500)'}>
          {parseDate(date)}
        </Typography>
      </Box>
    </Box>
  );
};
