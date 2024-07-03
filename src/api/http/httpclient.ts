import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const AxiosConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:3000",
  timeout: 10 * 1000,
  withCredentials: true,
};

export interface BaseResponse<T = any> {
  code: string;
  msg: string;
  data: T;
}

class HttpClient {
  private service: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.addReqInterceptors(this.service);
    this.addResInterceptors(this.service);
  }

  addReqInterceptors = (service: AxiosInstance) => {
    service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      return config;
    });
  };

  addResInterceptors = (service: AxiosInstance) => {
    service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data ?? {};
      },
      (error) => {
        Promise.reject(error.response);
      },
    );
  };

  get<R, T = any>(
    url: string,
    config?: AxiosRequestConfig<R>,
  ): Promise<BaseResponse<T>> {
    return this.service.get(url, config);
  }

  post<R, T = any>(
    url: string,
    body?: R,
    config?: AxiosRequestConfig<R>,
  ): Promise<BaseResponse<T>> {
    return this.service.post(url, body, config);
  }

  put<R, T = any>(
    url: string,
    body?: R,
    config?: AxiosRequestConfig<R>,
  ): Promise<BaseResponse<T>> {
    return this.service.put(url, body, config);
  }
  delete<R, T = any>(
    url: string,
    config?: AxiosRequestConfig<R>,
  ): Promise<BaseResponse<T>> {
    return this.service.delete(url, config);
  }
}

export default new HttpClient(AxiosConfig);
