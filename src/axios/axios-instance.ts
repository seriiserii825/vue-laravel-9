import axios from "axios";
export const baseApiUrl = "http://localhost:8088/api";

export const headers = {
  "Accept": "application/json",
};

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  headers: headers,
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("userToken") || null;
  return config;
});

export function addErrorHandler(fn: any) {
    axiosInstance.interceptors.response.use(response => response, fn);
    axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}

export {axiosInstance};
