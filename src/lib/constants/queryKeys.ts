import { useGetAvgImpressionsPerGeography } from '@/lib/api/hooks/impressions/useGetAvgImpressionsPerGeography';

export enum QueryKeys {
  useAuthLogin = 'useAuthLogin',
  useAuthResetPassword = 'useAuthResetPassword',
  useAuthForgotPassword = 'useAuthForgotPassword',
  useGetAccountData = 'useGetAccountData',
  useUpdateAccountData = 'useUpdateAccountData',

  useGetMachines = 'useGetMachines',

  useGetImpressions = 'useGetImpressions',
  useGetImpressionsPerWeek = 'useGetImpressionsPerWeek',
  useGetImpressionsPerGeography = 'useGetImpressionsPerGeography',
  useGetAverageImpressionsPerGeography = 'useGetAverageImpressionsPerGeography',
  
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

  useGetProducts = 'useGetProducts',
}
