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

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>
        {['', ''].map((_, index) => (
          <Card key={index} sx={{ gap: 2 }}>
            <Typography variant={'sm-medium'}>Purchases</Typography>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant={'3xl-medium'}>10,423</Typography>
                <Typography variant={'xs-semibold'}>5.3%</Typography>
              </Box>

              <LineChart data={chartData} color={'good'} />
            </Box>
          </Card>
        ))}
      </Box>

      <LineChart data={chartData} color={'bad'} />
      <LineChart data={chartData} />
      
      <Box sx={{background: 'var(--gradient)'}}>
        <LineChart data={chartData} color={'neutral'} sx={{height: 400}} />
      </Box>
    </MainLayout>
  );
}
