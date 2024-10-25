'use client';

import Link from 'next/link';
import { useCreateScheduleModal } from '@/ui/organisms/Modals';
import { Button } from '@/ui/atoms/Button';
import { Box, Stack } from '@mui/material';
import { BasicTab } from '@/ui/atoms/Tabs/Tabs';

export default function Home() {
  const [openScheduleModal] = useCreateScheduleModal();

  const createSchedule = () =>
    openScheduleModal({
      onConfirm: () => {},
    });

  return (
    <div>
      <Button onClick={createSchedule}>modal</Button>
      <Link href={'/admin'}>Admin</Link>
      <Box
        sx={{ background: 'white', border: 1 }}
        display={'flex'}
        flexDirection={'row'}>
        <BasicTab
          tabLabels={['Tab 1', 'Tab 2', 'Tab 3']}
          tabComponents={[<div>Tab1</div>, <div>Tab2</div>, <div>Tab3</div>]}
          additionalComponent={[
            <Stack>
              <Button variant="outlined" size="large">
                Tab1
              </Button>
              <Button>Tab1</Button>
            </Stack>,
            <button>Tab2</button>,
            <button>Tab3</button>,
          ]}
        />
      </Box>
    </div>
  );
}
