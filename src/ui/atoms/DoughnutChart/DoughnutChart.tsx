import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  data: number[];
  total?: number;
};

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

export const DoughnutChart = ({ data }: Props) => {
  const chartData: ChartData<'doughnut'> = {
    labels: data.map((_, index) => `Category ${index + 1}`),
    datasets: [
      {
        data: data,
        borderRadius: 10,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Doughnut
        data={chartData}
        options={{
          cutout: 65,
          backgroundColor: 'red',
          plugins: {
            legend: {
              display: false,
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
