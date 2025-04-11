import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useSalesImport = () => {
  const { salesService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useSalesImport],
    mutationFn: async (providedFile: File) =>
      salesService.importSalesApiV1SaleImportPost({
        providedFile,
      }),
    onError: () => {
      toast.error('Nayax import failed. Please try again.');
    },
    onSuccess: (response) => {
      toast.success(
        `Nayax imported successfully. Created records: ${response.data.created_records}`,
      );

      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetSales] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetAvgSales] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAvgSalesPerRange],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetQuantityByProduct],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetQuantityPerRange],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetQuantityPerProduct],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetQuantityPerProductOverTime],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetSalesPerTimePeriod],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetUnitsSold] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUnitsSoldStatistic],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetQuantityPerGeography],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetConversionRate],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetFrequencyOfSales],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetSalesQuantityByVenue],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useExportSales] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useScheduleSalesExport],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetSalesSchedule],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetSalesQuantityByCategory],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useDeleteSalesSchedule],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAvgProductsPerGeography],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetRawSales] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetProductsQuantityByVenue],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useSalesImport] });
    },
  });
};
