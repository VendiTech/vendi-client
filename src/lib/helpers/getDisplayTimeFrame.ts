import dayjs from 'dayjs';
import { DateRangeEnum } from '@/lib/generated/api';

export const getDisplayTimeFrame = (date: string, timeFrame: DateRangeEnum) => {
  const dayjsData = dayjs(date);

  switch (timeFrame) {
    case DateRangeEnum.Hour:
      return dayjsData.format('MM.DD, H:mm');
    case DateRangeEnum.Day:
      return dayjsData.format('MM.DD');
    case DateRangeEnum.Week:
      return `${dayjsData.format('MM.DD')}-${dayjsData.subtract(-6, 'day').format('MM.DD')}`;
    case DateRangeEnum.Month:
      return dayjsData.format('MMM');
    case DateRangeEnum.Quarter:
      return `${dayjsData.format('MMM')}-${dayjsData.subtract(-2, 'month').format('MMM')}`;
    case DateRangeEnum.Year:
      return dayjsData.format('YYYY');
    default:
      const check: never = timeFrame;

      return check;
  }
};
