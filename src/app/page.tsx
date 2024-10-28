'use client';

import Link from 'next/link';
import { MainLayout } from '@/ui/templates/MainLayout';
import { useCreateScheduleModal } from '@/ui/organisms/Modals';
import { Button } from '@/ui/atoms/Button';
import { LineChart } from '@/ui/atoms/LineChart';
import { Card } from '@/ui/atoms/Card';
import { Box, Typography } from '@mui/material';

const chartData = [1, 0.8, 1.3, 1.1, 1.4, 2];

export default function Home() {
  const [openScheduleModal] = useCreateScheduleModal();

  const createSchedule = () =>
    openScheduleModal({
      onConfirm: () => {},
    });

  return (
    <MainLayout title={'Dashboard'}>
      <Button onClick={createSchedule}>modal</Button>
      <Link href={'/admin'}>Admin</Link>

      <Card sx={{ gap: 2 }}>
        <Typography variant={'sm-medium'}>Purchases</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant={'3xl-medium'}>10,423</Typography>
            <Typography variant={'xs-semibold'}>5.3%</Typography>
          </Box>

          <LineChart data={chartData} color={'good'} />
        </Box>
      </Card>
    </MainLayout>
  );
}
