'use client';

import Link from 'next/link';
import { MainLayout } from '@/ui/templates/MainLayout';
import { useCreateScheduleModal } from '@/ui/organisms/Modals';
import { Button } from '@/ui/atoms/Button';
import { LineChart } from '@/ui/atoms/LineChart';
import { Card } from '@/ui/atoms/Card';
import { Box, Typography } from '@mui/material';
import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';

const chartData = [1, 0.8, 1.3, 1.1, 1.4, 2];
const barsData = [
  [2, 4],
  [1, 5],
  [2, 4],
  [0.8, 3.3],
  [2, 4],
  [3, 4.2],
  [4, 4.4],
] 

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

      <Box sx={{ background: 'var(--gradient)', p: 3 }}>
        <StackedBarChart
          sx={{
            width: 150,
          }}
          data={barsData}
        />
        <StackedBarChart
          sx={{
            width: 150,
          }}
          data={barsData}
          variant={'good'}
        />
        <StackedBarChart
          sx={{
            width: 150,
          }}
          data={barsData}
          variant={'bad'}
        />
        <StackedBarChart
          sx={{
            width: 150,
          }}
          placeholder
          data={[
            [0, 4],
            [0, 5],
            [0, 4],
            [0, 3.3],
            [0, 4],
            [0, 4.2],
            [0, 4.4],
          ]}
        />
      </Box>

      <DoughnutChart
        sx={{
          width: 200,
          height: 200,
        }}
        data={[234, 123, 632, 340, 65, 123]}
        total={3000}>
        <Typography sx={{ m: '0 auto' }}>16.3%</Typography>
      </DoughnutChart>

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

      <Box sx={{ background: 'var(--gradient)' }}>
        <LineChart data={chartData} color={'neutral'} sx={{ height: 400 }} />

        <DoughnutChart
          data={[]}
          total={1}
          colors={[]}
          backgroundColor={'#FFFFFF4D'}
          sx={{
            width: 100,
            height: 100,
          }}
        />

        <DoughnutChart
          data={[27]}
          total={100}
          colors={['#ffffff']}
          backgroundColor={'#FFFFFF4D'}
          sx={{
            width: 100,
            height: 100,
          }}>
          <Typography
            variant={'lg-medium'}
            sx={{ m: '0 auto', color: '#ffffff' }}>
            27%
          </Typography>
        </DoughnutChart>
      </Box>
    </MainLayout>
  );
}
