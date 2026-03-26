import axios, { type AxiosRequestConfig } from "axios";

const jsonplaceholderClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export async function fetchFromJsonplaceholder<T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await jsonplaceholderClient.get(endpoint, config);
  return response.data;
}
