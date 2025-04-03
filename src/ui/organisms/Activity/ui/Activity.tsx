import { Card } from '@/ui/atoms/Card';
import { Box, Typography } from '@mui/material';
import { ActivityItem } from '../ui/ActivityItem';
import { useGetInfiniteActivityLog } from '../api/useGetInfiniteActivityLog';
import { useHandleScrollToEnd } from '@/lib/helpers/useHandleScrollToEnd';

export const Activity = () => {
  const { data, fetchNextPage } = useGetInfiniteActivityLog();

  const handleScrollToEnd = useHandleScrollToEnd(fetchNextPage);

  return (
    <Card sx={{ minHeight: 400, height: '100%' }}>
      <Typography variant={'lg-medium'}>Activity</Typography>

      <Box
        onScroll={handleScrollToEnd}
        sx={{
          position: 'relative',
          flexGrow: '1',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          mt: '-12px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}>
        <Box sx={{ position: 'absolute' }}>
          {data.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
