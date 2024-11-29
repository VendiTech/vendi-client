import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { DateRangeEnum } from '@/lib/generated/api';

export const useGetImpressionsPerRange = (useDayTimeFrame?: boolean) => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetImpressionsPerRange,
      dateFrom,
      dateTo,
      useDayTimeFrame,
    ],
    queryFn: () =>
      impressionsService.getImpressionsPerRangeApiV1ImpressionImpressionsPerRangeGet(
        {
          timeFrame: useDayTimeFrame
            ? DateRangeEnum.Day
            : getTimeFrame(dateFrom, dateTo),
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
      ),
  });
};
