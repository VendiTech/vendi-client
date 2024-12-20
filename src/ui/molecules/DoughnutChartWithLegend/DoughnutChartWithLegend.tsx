import { Box, Typography } from '@mui/material';
import { chartColors } from '@/assets/styles/variables';
import { parseNumber } from '@/lib/helpers/parse-number';
import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { getGrowthPercent } from '@/lib/helpers/getGrowthPercent';

type Props = {
  data: {
    title: string;
    value: number;
    hideAtChart?: boolean;
  }[];
  direction?: 'row' | 'column';
  showPercent?: boolean;
  showAbsoluteValues?: boolean;
  isLoading?: boolean;
  previousValue: number;
  currentValue: number;
};

export const DoughnutChartWithLegend = (props: Props) => {
  const {
    data,
    direction = 'row',
    showPercent,
    showAbsoluteValues,
    isLoading,
    previousValue,
    currentValue,
  } = props;

  const chartData = [...data]
    .filter((item) => !item.hideAtChart)
    .map((item) => item.value);

  const totalCount = data.reduce((acc, curr) => acc + curr.value, 0);
  const chartDataSum = chartData.reduce((acc, curr) => acc + curr, 0);

  const percent = Math.round((chartDataSum / totalCount) * 1000) / 10;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: {
          mobile: 'column',
          desktop: direction,
        },
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}>
        <Box sx={{ width: 160, height: 160 }}>
          <DoughnutChart
            isLoading={isLoading}
            total={totalCount}
            data={chartData}
            labels={data.map((item) => item.title)}
            colors={chartColors}>
            <LoadingText
              isLoading={!!isLoading}
              variant={'3xl-medium'}
              color={'var(--slate-900)'}>
              {showPercent
                ? percent + '%'
                : parseNumber(Math.round(totalCount * 10) / 10)}
            </LoadingText>

            <GrowthPercent
              isLoading={isLoading}
              percent={getGrowthPercent(previousValue, currentValue)}
            />
          </DoughnutChart>
        </Box>
      </Box>

      {!isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            flexGrow: direction === 'column' ? 0 : 1,
            overflowY: 'auto',
            maxHeight: 200,
            p: 1,
            m: -1,
            minWidth: {
              mobile: '100%',
              desktop: direction === 'column' ? '100%' : 220,
            },
          }}>
          {data.map((item, i) => (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--slate-500)',
              }}>
              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '3px',
                    backgroundColor: item.hideAtChart
                      ? 'var(--slate-100)'
                      : chartColors[i],
                    border: item.hideAtChart
                      ? '1px solid var(--slate-200)'
                      : 'none',
                  }}
                />

                <Typography variant={'sm-regular'}>{item.title}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {showAbsoluteValues ? (
                  <Typography variant={'sm-regular'}>
                    {parseNumber(item.value)}
                  </Typography>
                ) : null}

                <Typography variant={'sm-regular'}>
                  {Math.round((item.value / totalCount) * 1000) / 10}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};
