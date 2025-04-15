import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useImpressionsImport = () => {
  const { impressionsService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useImpressionsImport],
    mutationFn: async (providedFile: File) =>
      impressionsService.importImpressionsApiV1ImpressionImportPost({
        providedFile,
      }),
    onError: () => {
      toast.error('DataJam import failed. Please try again.');
    },
    onSuccess: (response) => {
      toast.success(
        `DataJam imported successfully. Created records: ${response.data.created_records}`,
      );

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressionsPerRange],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressionsPerGeography],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressionsSchedule],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useScheduleImpressionsExport],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useExportImpressions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useDeleteImpressionsSchedule],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAvgImpressions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAdvertsPlayout],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAdvertsPlayoutStatistic],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAvgExposure],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetMonthOnMonthSummary],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetExposurePerRange],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressionsByVenue],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetRawImpressions],
      });
    },
  });
};
