import { Stack } from '@mui/material';
import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { ActivityTable } from '@/ui/organisms/Activity';

export const HistoryTemplate = () => {
  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <GlobalFilters showRegionFilter={false} />

      <ActivityTable />
    </Stack>
  );
};
