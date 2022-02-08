import type { AxiosRequestHeaders, AxiosRequestConfig } from "axios";
import axios from "axios";
import { BASE_URL } from "./constants"

const config: AxiosRequestConfig = { baseURL: BASE_URL };

export const axiosInstance = axios.create(config)