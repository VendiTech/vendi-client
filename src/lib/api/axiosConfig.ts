import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Routes } from '@/lib/constants/routes';

class AxiosConfig {
  private readonly axiosConfig: AxiosInstance;

  constructor(url: string) {
    this.axiosConfig = axios.create({ baseURL: url, withCredentials: true });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosConfig.interceptors.response.use(
      (response) => response,

      (error) => {
        if (error.response.status === 401) {
          Cookies.remove(`${process.env.NEXT_PUBLIC_COOKIE as string}_front`, {
            path: '/',
          });

          window.location.href = Routes.SignIn;
        }

        return Promise.reject(error);
      },
    );
  }

  public getAxiosInstance() {
    return this.axiosConfig;
  }
}

const url = process.env.NEXT_PUBLIC_URL;

export const axiosInstance = new AxiosConfig(url!);
