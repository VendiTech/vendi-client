import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ParamsNames } from './params-names';

export const useGlobalFilters = () => {
  const params = useSearchParams();

  const region = params.get(ParamsNames.Region);
  const range = params.get(ParamsNames.DateRange);
  const advertisingId = params.get(ParamsNames.AdvertisingId);
  const product = params.get(ParamsNames.Product);

  return useMemo(
    () => ({ region, range, advertisingId, product }),
    [region, range, advertisingId, product],
  );
};
