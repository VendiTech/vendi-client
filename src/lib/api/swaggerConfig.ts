import { useMemo } from 'react';
import {
  AdminActivityLogApi,
  AdminUserApi,
  AuthLoginApi,
  AuthResetPasswordApi,
  AuthVerifyApi,
  Configuration,
  GeographiesApi,
  ImpressionsApi,
  MachinesApi,
  ProductsApi,
  SalesApi,
  UserApi,
} from '../generated/api';
import { axiosInstance } from './axiosConfig';

const basePath = process.env.NEXT_PUBLIC_URL;

export const useSwaggerConfig = () => {
  const config = useMemo(() => {
    return new Configuration({ basePath });
  }, []);

  const services = useMemo(() => {
    return {
      authService: new AuthLoginApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      passwordService: new AuthResetPasswordApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      verifyService: new AuthVerifyApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      userService: new UserApi(config, '', axiosInstance.getAxiosInstance()),
      userAdminService: new AdminUserApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      salesService: new SalesApi(config, '', axiosInstance.getAxiosInstance()),
      geographiesService: new GeographiesApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      impressionsService: new ImpressionsApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      machinesService: new MachinesApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      activityService: new AdminActivityLogApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      productsService: new ProductsApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
    };
  }, [config]);

  return services;
};
