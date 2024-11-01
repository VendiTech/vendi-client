import axios, { AxiosInstance } from 'axios';

class AxiosConfig {
  private readonly axiosConfig: AxiosInstance;

  constructor(url: string) {
    this.axiosConfig = axios.create({ baseURL: url, withCredentials: true });
  }

  public getAxiosInstance() {
    return this.axiosConfig;
  }
}

const url = process.env.NEXT_PUBLIC_URL;

export const axiosInstance = new AxiosConfig(url!);
