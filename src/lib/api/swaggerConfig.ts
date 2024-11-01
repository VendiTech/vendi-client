import { useMemo } from 'react';
import {
  AuthLoginApi,
  AuthResetPasswordApi,
  AuthVerifyApi,
  Configuration,
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
    };
  }, [config]);

  return services;
};
