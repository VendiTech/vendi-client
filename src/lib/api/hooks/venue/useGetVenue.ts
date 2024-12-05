import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetVenue = () => {
  const {salesService} = useSwaggerConfig()

  // TODO replace endpoint
  
  return useQuery({
    queryKey: [QueryKeys.useGetVenue],
    queryFn: () => salesService.getSalesQuantityByVenueApiV1SaleSalesQuantityByVenueGet({
      dateFrom: '2023-01-01',
    })
  })  
}