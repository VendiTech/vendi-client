import { Box, Typography } from '@mui/material';
import { parseDate } from '@/lib/helpers/parse-date';
import { ActivityLogDetailSchema } from '@/lib/generated/api';
import { getActivityUsername } from '@/ui/organisms/Activity/helpers/getActivityUsername';
import { getActivityContent } from '@/ui/organisms/Activity/helpers/getActivityContent';
import { useState } from 'react';

export const ActivityItem = (props: ActivityLogDetailSchema) => {
  const username = getActivityUsername(props);
  const content = getActivityContent(props);
  const { created_at: date } = props;

  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      onClick={() => setExpanded(!expanded)}
      sx={{
        cursor: 'pointer',
        gap: 2,
        py: 1.5,
        '&:not(:last-child)': {
          borderBottom: '1px solid var(--slate-200)',
        },
      }}>
      <Typography
        variant={'sm-regular'}
        sx={{
          display: 'block',
          lineHeight: 1.5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxHeight: expanded ? 'unset' : '43px',
        }}>
        <Typography variant={'sm-semibold'}>{username} </Typography>
        {content}
      </Typography>

      <Typography
        sx={{ display: 'block', lineHeight: '21px' }}
        variant={'sm-regular'}
        color={'var(--slate-500)'}>
        {parseDate(new Date(date))}
      </Typography>
    </Box>
  );
};
