import axios from "axios";
import { baseApiUrl, headers } from "./vue-variables";

export const baseApiUrl = "http://localhost:8088/api";

export const headers = {
    "Content-Type": "application/json",
};

export const axiosInstance = axios.create({
    baseURL: baseApiUrl,
    headers: headers,
});
