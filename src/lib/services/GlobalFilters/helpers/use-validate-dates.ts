import { useEffect } from 'react';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';
import { useGlobalFilters } from './use-global-filters';
import { useHandleDateChange } from './use-handle-date-change';
import { validateDates } from './validate-dates';

export const useValidateDates = () => {
  const { dateFrom, dateTo } = useGlobalFilters();
  const handleDateChange = useHandleDateChange();

  useEffect(() => {
    const { validatedDateFrom, validatedDateTo } = validateDates(
      dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null,
      dateTo ? dayjs(dateTo, DATE_FORMAT) : null,
    );

    handleDateChange(
      dateFrom === null ? dateFrom : validatedDateFrom,
      dateTo === null ? dateTo : validatedDateTo,
    );
  }, [dateTo, dateFrom, handleDateChange]);
};