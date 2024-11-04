'use client';

import { Box } from '@mui/material';
import { Banner } from '@/ui/organisms/Banner';
import { BarChart } from '@/ui/atoms/BarChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { LocationSales } from '@/ui/molecules/LocationSales';
import { useEffect, useState } from 'react';
import {
  barChartData2,
  doughnutChartData1,
  doughnutChartData2,
  lineChartData1,
  lineChartData2,
  locationSales,
} from '@/assets/mocks/charts';
import { NoData } from '@/ui/atoms/NoData';
import { UnitsSold } from '@/ui/organisms/UnitsSold';

export const DashboardTemplate = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
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
          growthPercent={5.3123}
          isLoading={isLoading}>
          <LineChart
            isLoading={isLoading}
            data={lineChartData1}
            color={'good'}
            sx={{ width: '100%', height: '100%' }}
          />
        </ChartInfoCard>

        <ChartInfoCard
          title={'Avg. Sales'}
          value={'7.76'}
          growthPercent={-2.123}
          isLoading={isLoading}>
          <LineChart
            isLoading={isLoading}
            data={lineChartData2}
            color={'bad'}
            sx={{ width: '100%', height: '100%' }}
          />
        </ChartInfoCard>

        <ChartInfoCard
          title={'Exposure'}
          value={'15s'}
          isLoading={isLoading}
          growthPercent={5.3123}>
          <LineChart
            isLoading={isLoading}
            data={lineChartData1}
            color={'good'}
            sx={{ width: '100%', height: '100%' }}
          />
        </ChartInfoCard>
      </Box>

      <UnitsSold />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          gridTemplateColumns: {
            mobile: 'auto',
            desktop: '1fr 1fr',
          },
        }}>
        <ChartCard
          sx={{ flexGrow: 1 }}
          isLoading={isLoading}
          title={'Product Split'}
          subtitle={'You sold 924 products in one day.'}
          actions={[]}>
          <DoughnutChartWithLegend
            isLoading={isLoading}
            data={doughnutChartData1}
            growthPercent={5.0999}
          />
        </ChartCard>

        <ChartCard
          sx={{ flexGrow: 1 }}
          isLoading={isLoading}
          title={'Frequency of Sales'}
          subtitle={'You sold 162 products in one day.'}
          actions={[]}>
          <BarChart
            isLoading={isLoading}
            data={barChartData2}
            sx={{ height: '100%' }}
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
          {isLoading ? (
            <NoData />
          ) : (
            locationSales.map((item) => (
              <LocationSales
                key={item.location}
                {...item}
                highlightOpacity={0.6}
              />
            ))
          )}
        </ChartCard>

        <ChartCard title={'Conversion Rate'}>
          <DoughnutChartWithLegend
            isLoading={isLoading}
            showAbsoluteValues
            showPercent
            data={doughnutChartData2}
            growthPercent={12.5454}
            direction={'column'}
          />
        </ChartCard>
      </Box>
    </>
  );
};
