import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ParamsNames } from './params-names';

export const useGlobalFilters = () => {
  const params = useSearchParams();

  const region = params.get(ParamsNames.Region);
  const dateFrom = params.get(ParamsNames.DateFrom);
  const dateTo = params.get(ParamsNames.DateTo);
  const advertisingId = params.get(ParamsNames.AdvertisingId);
  const product = params.get(ParamsNames.Product);
  
  return useMemo(
    () => ({
      region: region?.split(',') ?? null,
      product: product?.split(',') ?? null,
      dateFrom,
      dateTo,
      advertisingId,
    }),
    [region, dateFrom, dateTo, advertisingId, product],
  );
};
