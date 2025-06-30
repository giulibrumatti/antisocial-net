import axios from "axios";
import type { AxiosInstance } from "axios";

const baseURL = "http://localhost:3001/";

const client: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});

export default client;