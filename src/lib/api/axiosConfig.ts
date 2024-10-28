import axios, { AxiosInstance } from 'axios';

class AxiosConfig {
  private readonly axiosConfig: AxiosInstance;

  constructor(url: string) {
    this.axiosConfig = axios.create({ baseURL: url });

    this.setUpInterceptors();
  }

  public getAxiosInstance() {
    return this.axiosConfig;
  }

  public async refreshToken() {
    const creds = JSON.parse(localStorage.getItem('auth') ?? '{}');

    const { refresh } = creds;

    if (!refresh) {
      throw new Error('There is no refresh token');
    }

    try {
      const response = await axios.post(
        '/auth/token/refresh',
        {
          refresh,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { access } = response.data;

      localStorage.setItem('auth', JSON.stringify({ access }));

      return { access };
    } catch (error) {
      throw error;
    }
  }

  public setUpInterceptors() {
    this.axiosConfig.interceptors.request.use((config) => {
      const credentials = JSON.parse(localStorage.getItem('auth') ?? '{}');

      if (credentials.access) {
        config.headers['Authorization'] = `Bearer ${credentials.access}`;
      }

      return config;
    });

    this.axiosConfig.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { access } = await this.refreshToken();
            this.axiosConfig.defaults.headers.common['Authorization'] =
              `Bearer ${access}`;
            originalRequest.headers['Authorization'] = `Bearer ${access}`;

            return this.axiosConfig(originalRequest);
          } catch (refreshError) {
            console.log(refreshError, 'refreshError');

            return Promise.reject(refreshError);
          }
        } else if (error.response?.status === 500 && originalRequest._retry) {
          console.error(error);
          return Promise.reject(error);
        } else {
          console.log('other error')
          return Promise.reject(error);
        }
      },
    );
  }
}

const url = process.env.NEXT_PUBLIC_URL;

export const axiosInstance = new AxiosConfig(url!);
