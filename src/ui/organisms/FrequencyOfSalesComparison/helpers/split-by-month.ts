import dayjs from 'dayjs';
import { CategoryTimeFrameSalesSchema } from '@/lib/generated/api';
import { MultiBarChartData } from '@/ui/atoms/MultiBarChart';

export const parseSalesData = (
  input: CategoryTimeFrameSalesSchema[],
): MultiBarChartData[] => {
  const groupedData: Record<string, Record<string, number>> = {};

  input.forEach((category) => {
    category.sale_range.forEach(({ quantity, time_frame }) => {
      const date = dayjs(time_frame);
      const year = date.year();
      const month = date.month();
      const key = `${month}-${year}`;

      if (!groupedData[key]) groupedData[key] = {};

      if (!groupedData[key][category.category_name])
        groupedData[key][category.category_name] = 0;

      groupedData[key][category.category_name] += quantity;
    });
  });

  const yearCheck: Record<number, Set<number>> = {};

  Object.keys(groupedData).forEach((key) => {
    const [month, year] = key.split('-').map(Number);

    if (!yearCheck[month]) yearCheck[month] = new Set();

    yearCheck[month].add(year);
  });

  const hasMultipleYears = Object.values(yearCheck).some(
    (years) => years.size > 1,
  );

  const result: MultiBarChartData[] = [];

  Object.keys(groupedData).forEach((key, i) => {
    const [month, year] = key.split('-').map(Number);

    const label = hasMultipleYears
      ? `${dayjs().month(month).format('MMMM')} ${year}`
      : dayjs().month(month).format('MMMM');

    const values = input.map(
      (category) => groupedData[key][category.category_name] || 0,
    );

    result.push({ label, values });
  });

  return result.sort((a, b) => {
    const aDate = dayjs(a.label, ['MMMM YYYY', 'MMMM']);
    const bDate = dayjs(b.label, ['MMMM YYYY', 'MMMM']);
    return aDate.isBefore(bDate) ? -1 : aDate.isAfter(bDate) ? 1 : 0;
  });
};
