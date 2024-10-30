'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { Banner } from '@/ui/organisms/Banner';
import { BarChart } from '@/ui/atoms/BarChart';
import { Box } from '@mui/material';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { ChartCard } from '@/ui/molecules/ChartCard';

const barChartData1 = [
  { label: 'Dec 4, 2023', value: 45954 },
  { label: 'Jan 11', value: 171567 },
  { label: 'Jan 21', value: 95234 },
  { label: 'Feb 4', value: 120145 },
];

const barChartData2 = [
  { label: '6-10am', value: 40 },
  { label: '10-2pm', value: 170 },
  { label: '2-4pm', value: 95 },
  { label: '6-10pm', value: 117 },
  { label: '10-2am', value: 49 },
  { label: '2-6am', value: 64 },
];

const lineChartData1 = [3, 2, 4, 3.3, 5];
const lineChartData2 = [3, 4, 5, 4, 4, 2];

export default function Home() {
  return (
    <MainLayout title={'Dashboard'}>
      <Banner />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            mobile: 'auto',
            desktop: 'repeat(3, 1fr)',
          },
        }}>
        <ChartInfoCard
          title={'Purchases'}
          value={'10,423'}
          growthPercent={5.3123}>
          <LineChart
            data={lineChartData1}
            color={'good'}
            sx={{ width: '100%', height: '100%' }}
          />
        </ChartInfoCard>

        <ChartInfoCard
          title={'Avg. Sales'}
          value={'7.76'}
          growthPercent={-2.123}>
          <LineChart
            data={lineChartData2}
            color={'bad'}
            sx={{ width: '100%', height: '100%' }}
          />
        </ChartInfoCard>

        <ChartInfoCard title={'Exposure'} value={'15s'} growthPercent={5.3123}>
          <LineChart
            data={lineChartData1}
            color={'good'}
            sx={{ width: '100%', height: '100%' }}
          />
        </ChartInfoCard>
      </Box>

      <ChartCard
        title={'Units sold'}
        subtitle={`You made $203k in revenue this month.`}>
        <BarChart
          data={barChartData1}
          sx={{ height: 275 }}
          yLabelsCallback={(labelValue) =>
            `$${Math.round(+labelValue / 1000)}${labelValue !== 0 ? 'k' : ''}`
          }
        />
      </ChartCard>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            desktop: '1fr 1fr',
          },
        }}>
        <Box></Box>

          <ChartCard
            title={'Frequency of Sales'}
            subtitle={'You sold 162 products in one day.'}>
            <BarChart
              data={barChartData2}
              sx={{ height: 275, width: '100%' }}
            />
          </ChartCard>
      </Box>
    </MainLayout>
  );
}
