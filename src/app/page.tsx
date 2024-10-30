'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { Banner } from '@/ui/organisms/Banner';
import { BarChart } from '@/ui/atoms/BarChart';
import { Box } from '@mui/material';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { LocationSales } from '@/ui/molecules/LocationSales';
import { MultiBarChart } from '@/ui/atoms/MultiBarChart';

const barChartData1 = [
  { label: 'Dec 4, 2023', value: 45954, lineValue: 41954 },
  { label: 'Jan 11', value: 171567, lineValue: 150567 },
  { label: 'Jan 21', value: 95234, lineValue: 91234 },
  { label: 'Feb 4', value: 120145, lineValue: 110145 },
];

const barChartData2 = [
  { label: '6-10am', value: 40 },
  { label: '10-2pm', value: 170 },
  { label: '2-4pm', value: 95 },
  { label: '6-10pm', value: 117 },
  { label: '10-2am', value: 49 },
  { label: '2-6am', value: 64 },
];

const multiBarChartData = [
  { label: 'March', values: [1, 4, 1] },
  { label: 'April', values: [3, 5, 5] },
  { label: 'May', values: [2, 6, 10] },
]

const lineChartData1 = [3, 2, 4, 3.3, 5];
const lineChartData2 = [3, 4, 5, 4, 4, 2];

const doughnutChartData1 = [
  { title: 'Mint', value: 288 },
  { title: 'Spearmint', value: 291 },
  { title: 'Watermelon', value: 431 },
];

const doughnutChartData2 = [
  { title: 'Returning customers', value: 171 },
  { title: 'New customers', value: 845, hideAtChart: true },
];

const locationSales = [
  { location: 'Liverpool', percent: 35.2 },
  { location: 'Manchester', percent: 30 },
  { location: 'Leeds', percent: 15 },
  { location: 'London', percent: 10 },
  { location: 'Newcastle', percent: 10 },
  { location: 'Oxford', percent: 7 },
  { location: 'Southampton', percent: 7.434343 },
  { location: 'Edinburgh', percent: 5.77676 },
  { location: 'Glasgow', percent: 6 },
  { location: 'Cambridge', percent: 6 },
];

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
          sx={{ flexGrow: 1 }}
          yLabelsCallback={(labelValue) =>
            `$${Math.round(+labelValue / 1000)}${labelValue !== 0 ? 'k' : ''}`
          }
        />
      </ChartCard>

      <ChartCard
        title={'Units sold'}
        subtitle={`You made $203k in revenue this month.`}>
        <BarChart
          withLine
          data={barChartData1}
          sx={{ flexGrow: 1 }}
          yLabelsCallback={(labelValue) =>
            `$${Math.round(+labelValue / 1000)}${labelValue !== 0 ? 'k' : ''}`
          }
        />
      </ChartCard>

      <ChartCard
        title={'Units sold'}
        subtitle={`You made $203k in revenue this month.`}>
        <MultiBarChart data={multiBarChartData} sx={{ flexGrow: 1 }} />
      </ChartCard>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            desktop: '1fr 1fr',
          },
        }}>
        <ChartCard
          title={'Product Split'}
          subtitle={'You sold 924 products in one day.'}>
          <DoughnutChartWithLegend
            data={doughnutChartData1}
            growthPercent={5.0999}
          />
        </ChartCard>

        <ChartCard
          title={'Frequency of Sales'}
          subtitle={'You sold 162 products in one day.'}>
          <BarChart
            data={barChartData2}
            sx={{ height: '100%', width: '100%' }}
          />
        </ChartCard>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            desktop: '2fr 1fr',
          },
        }}>
        <ChartCard
          title={'Product by Geography'}
          subtitle={'You sold products in 10 locations.'}>
          {locationSales.map((item) => (
            <LocationSales
              key={item.location}
              {...item}
              highlightOpacity={0.6}
            />
          ))}
        </ChartCard>

        <ChartCard title={'Conversion Rate'}>
          <DoughnutChartWithLegend
            showAbsoluteValues
            data={doughnutChartData2}
            growthPercent={12.5454}
          />
        </ChartCard>
      </Box>
    </MainLayout>
  );
}
