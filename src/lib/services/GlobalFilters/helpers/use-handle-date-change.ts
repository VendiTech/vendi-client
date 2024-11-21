import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Dayjs } from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';
import { validateDates } from './validate-dates';
import { ParamsNames } from './params-names';
import { useUpdateUrl } from './use-update-url';

export const useHandleDateChange = () => {
  const searchParams = useSearchParams()
  const updateUrl = useUpdateUrl()
  
  return useCallback(
    (dateFrom: Dayjs | null, dateTo: Dayjs | null) => {
      const { validatedDateFrom, validatedDateTo } = validateDates(
        dateFrom,
        dateTo,
      );

      const params = new URLSearchParams(searchParams);

      params.set(ParamsNames.DateFrom, validatedDateFrom.format(DATE_FORMAT));
      params.set(ParamsNames.DateTo, validatedDateTo.format(DATE_FORMAT));

      updateUrl(params);
    },
    [searchParams, updateUrl],
  );
}