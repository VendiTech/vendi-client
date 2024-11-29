import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';
import { DateRangeEnum } from '@/lib/generated/api';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const getUnitsSoldTimeFrame = (
  dateFrom: string | null,
  dateTo: string | null,
) => {
  if (!dateFrom || !dateTo) {
    return DateRangeEnum.Day;
  }

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  if (dayjsDateTo.isSame(dayjsDateFrom, 'month')) {
    return DateRangeEnum.Day;
  }

  return getTimeFrame(dateFrom, dateTo);
};
