import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DateRangeEnum } from '@/lib/generated/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useStatisticDates } from '@/lib/helpers/useStatisticDates';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  orderBy: string | null;
  orderDirection: string | null;
  timeFrame?: DateRangeEnum;
  getStatistic?: boolean;
};

export const useGetImpressionsByVenue = ({
  orderBy,
  orderDirection,
  timeFrame = DateRangeEnum.Year,
  getStatistic,
}: Params) => {
  const { impressionsService } = useSwaggerConfig();

  const { region } = useGlobalFilters();
  const { dateFrom, dateTo } = useStatisticDates(getStatistic);

  const orderByFilter = getOrderBy({ orderDirection, orderBy });

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetImpressionsByVenue,
      timeFrame,
      dateFrom,
      dateTo,
      region,
      orderByFilter,
    ],
    queryFn: (page: number) =>
      impressionsService.getImpressionsByVenuePerRangeApiV1ImpressionImpressionsByVenuePerRangeGet(
        {
          dateFrom,
          dateTo,
          timeFrame,
          geographyIdIn: region?.join(','),
          page,
          orderBy: orderByFilter,
        },
      ),
  });
};
