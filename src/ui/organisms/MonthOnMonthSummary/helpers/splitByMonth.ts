import dayjs from 'dayjs';
import { ImpressionsSalesPlayoutsConvertions } from '@/lib/generated/api';

const getKey = (date: string) => dayjs(date).format('MMM YYYY')

export const splitByMonth = (data: ImpressionsSalesPlayoutsConvertions[]) => {
  const getRow = (
    field: keyof ImpressionsSalesPlayoutsConvertions,
    id: string,
  ) =>
    data.reduce(
      (acc, curr) => ({
        ...acc,
        [getKey(curr.time_frame)]: curr[field],
      }),
      { id },
    );

  const getDeltaRow = (
    field: keyof ImpressionsSalesPlayoutsConvertions,
    id: string,
  ) =>
    data.reduce(
      (acc, curr, i) => {
        let delta = null;

        const currValue = Number(curr[field]) ?? 0;
        const prevValue = Number(data[i - 1]?.[field]);

        if (i >= 0) {
          delta = ((currValue - prevValue) / prevValue) * 100;
        }

        return {
          ...acc,
          [getKey(curr.time_frame)]: delta,
        };
      },
      { id },
    );

  const conversionRates = data.reduce(
    (acc, curr) => ({
      ...acc,
      [getKey(curr.time_frame)]:
        curr.customers_returning ?? 0 / (curr.customers_new ?? 1),
    }),
    { id: 'Avg monthly conversion' },
  );

  return [
    getRow('impressions', 'Impressions'),
    getDeltaRow('impressions', '% change of impressions'),
    getRow('quantity', 'Sales (in cans)'),
    getDeltaRow('quantity', '% change of sales'),
    getRow('advert_playouts', 'Advert playout'),
    conversionRates,
  ];
};
