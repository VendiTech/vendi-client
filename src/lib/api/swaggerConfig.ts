import { useMemo } from 'react';
import { Configuration, RegisterApi, TokenApi } from '../generated/api';
import { axiosInstance } from './axiosConfig';

const basePath = process.env.NEXT_PUBLIC_URL;

export const useSwaggerConfig = () => {
  const config = useMemo(() => {
    return new Configuration({ basePath });
  }, []);

  const services = useMemo(() => {
    return {
      registerService: new RegisterApi(
        config,
        '',
        axiosInstance.getAxiosInstance(),
      ),
      tokenService: new TokenApi(config, '', axiosInstance.getAxiosInstance()),
    };
  }, [config]);

  return services;
};
