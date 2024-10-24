import { Card } from '@/ui/atoms/Card';
import { ActivityHeader } from './ActivityHeader';
import { Box } from '@mui/material';
import { mockActivities } from '../helpers/mock-activities';
import { ActivityItem } from '@/ui/organisms/Activity/ui/ActivityItem';

export const Activity = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <ActivityHeader />

      <Box
        sx={{
          position: 'relative',
          flexGrow: '1',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          mt: '-12px',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}>
        <Box sx={{ position: 'absolute' }}>
          {mockActivities.map((item) => (
            <ActivityItem key={item.id} {...item} />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
