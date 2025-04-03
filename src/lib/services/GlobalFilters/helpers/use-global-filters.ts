import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';
import { ParamsNames } from './params-names';

export const useGlobalFilters = () => {
  const params = useSearchParams();

  const region = params.get(ParamsNames.Region);
  const machine = params.get(ParamsNames.Machine);
  const dateFrom = params.get(ParamsNames.DateFrom);
  const dateTo = params.get(ParamsNames.DateTo);
  const venue = params.get(ParamsNames.Venue);
  const product = params.get(ParamsNames.Product);
  const productItem = params.get(ParamsNames.ProductItem);
  const user = params.get(ParamsNames.User);

  const startOfCurrentMonth = useMemo(
    () => dayjs(dayjs().format('YYYY-MM')).format(DATE_FORMAT),
    [],
  );

  return useMemo(
    () => ({
      region: region?.split(',') ?? null,
      machine: machine?.split(',') ?? null,
      product: product?.split(',') ?? null,
      productItem: productItem?.split(',') ?? null,
      dateFrom: dateFrom ?? startOfCurrentMonth,
      dateTo,
      venue: venue?.split(',') ?? null,
      user: user?.split(',') ?? null,
    }),
    [
      region,
      machine,
      product,
      productItem,
      dateFrom,
      startOfCurrentMonth,
      dateTo,
      venue,
      user,
    ],
  );
};
