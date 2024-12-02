import { Card } from '@/ui/atoms/Card';
import { ActivityHeader } from './ActivityHeader';
import { Box } from '@mui/material';
import { ActivityItem } from '../ui/ActivityItem';
import { useGetActivityLog } from '../api/useGetActivityLog';

export const Activity = () => {
  const { data } = useGetActivityLog();

  return (
    <Card sx={{ minHeight: 400, height: '100%' }}>
      <ActivityHeader />

      <Box
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
          {(data?.data.items ?? []).map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
