import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';

export const useGetSalesQuantityByVenue = (getStatistic?: boolean) => {
  const { salesService } = useSwaggerConfig();
  
  const { dateFrom, dateTo, region, product } = useGlobalFilters();
  
  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);
  
  const startDate = getStatistic
    ? dayjsDateFrom
      .subtract(1 + dayjsDateTo.diff(dayjsDateFrom, 'day'), 'days')
      .format(DATE_FORMAT)
    : dateFrom;

  const endDate = getStatistic
    ? dayjsDateFrom.subtract(1, 'days').format(DATE_FORMAT)
    : dateTo;

  return useQuery({
    queryKey: [
      QueryKeys.useGetSalesQuantityByVenue,
      startDate,
      endDate,
      region,
      product,
    ],
    queryFn: () =>
      salesService.getSalesQuantityByVenueApiV1SaleSalesQuantityByVenueGet({
        dateFrom: startDate,
        dateTo: endDate,
        geographyIdIn: region?.join(','),
        productProductCategoryIdIn: product?.join(','),
      }),
  });
};
