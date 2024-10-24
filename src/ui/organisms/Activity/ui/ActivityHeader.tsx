import { Box, Typography } from '@mui/material';
import { ActionsMenu } from '@/ui/molecules/MenuButton';

export const ActivityHeader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant={'lg-medium'}>Activity</Typography>

      <ActionsMenu actions={[{ name: 'Refresh', fn: console.log }]} />
    </Box>
  );
};
