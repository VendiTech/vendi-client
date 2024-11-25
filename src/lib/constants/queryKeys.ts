import { useDeleteUser } from '@/ui/organisms/PartnerManagementTable/hooks/useDeleteUser';

export enum QueryKeys {
  useAuthLogin = 'useAuthLogin',
  useAuthResetPassword = 'useAuthResetPassword',
  useAuthForgotPassword = 'useAuthForgotPassword',
  useGetAccountData = 'useGetAccountData',
  useUpdateAccountData = 'useUpdateAccountData',

  useGetUsers = 'useGetUsers',
  useUpdateUser = 'useUpdateUser',
  useDeleteUser = 'useDeleteUser',
  
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
