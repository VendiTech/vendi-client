import { useScheduleImpressionsExport } from '@/ui/organisms/ExportImpressionsTable/hooks/useScheduleImpressionsExport';
import { useExportImpressions } from '@/ui/organisms/ExportImpressionsTable/hooks/useExportImpressions';
import { useDeleteImpressionsSchedule } from '@/ui/organisms/ExportImpressionsTable/hooks/useDeleteImpressionsSchedule';

export enum QueryKeys {
  useAuthLogin = 'useAuthLogin',
  useAuthResetPassword = 'useAuthResetPassword',
  useAuthForgotPassword = 'useAuthForgotPassword',
  useGetAccountData = 'useGetAccountData',
  useUpdateAccountData = 'useUpdateAccountData',
  useGetVerified = 'useGetVerified',
  useAuthLogout = 'useAuthLogout',

  useGetUsers = 'useGetUsers',
  useUpdateUser = 'useUpdateUser',
  useDeleteUser = 'useDeleteUser',
  useResetPassword = 'useResetPassword',

  useGetMachines = 'useGetMachines',

  useGetImpressions = 'useGetImpressions',
  useGetImpressionsPerWeek = 'useGetImpressionsPerWeek',
  useGetImpressionsPerGeography = 'useGetImpressionsPerGeography',
  useGetAverageImpressionsPerGeography = 'useGetAverageImpressionsPerGeography',
  useGetImpressionsSchedule = 'useGetImpressionsSchedule',
  useScheduleImpressionsExport = 'useScheduleImpressionsExport',
  useExportImpressions = 'useExportImpressions',
  useDeleteImpressionsSchedule = 'useDeleteImpressionsSchedule',

  useGetGeographies = 'useGetGeographies',

  useGetSales = 'useGetSales',
  useGetAvgSales = 'useGetAvgSales',
  useGetAvgSalesPerRange = 'useGetAvgSalesPerRange',
  useGetQuantityByProduct = 'useGetQuantityByProduct',
  useGetQuantityPerRange = 'useGetQuantityPerRange',
  useGetQuantityPerProduct = 'useGetQuantityPerProduct',
  useGetQuantityPerProductOverTime = 'useGetQuantityPerProductOverTime',
  useGetSalesPerTimePeriod = 'useGetSalesPerTimePeriod',
  useGetUnitsSold = 'useGetUnitsSold',
  useGetQuantityPerGeography = 'useGetQuantityPerGeography',
  useGetConversionRate = 'useGetConversionRate',
  useGetFrequencyOfSales = 'useGetFrequencyOfSales',
  useGetSalesQuantityByVenue = 'useGetSalesQuantityByVenue',
  useExportSales = 'useExportSales',
  useScheduleSalesExport = 'useScheduleSalesExport',
  useGetSalesSchedule = 'useGetSalesSchedule',
  useGetSalesQuantityByCategory = 'useGetSalesQuantityByCategory',
  useDeleteSalesSchedule = 'useDeleteSalesSchedule',

  useGetProducts = 'useGetProducts',
}
