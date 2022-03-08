import { history } from "app/history";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  // baseURL: env.API_URL,
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Attach token to request if exists
    // Refresh token
    const accessToken: any = localStorage.getItem("access_token");

    if (accessToken) {
      let headers: any = config.headers;
      headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data; // lấy data
  },
  function (error) {
    console.log("error.response", error.response.data.message);
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }
    if (!error.response) {
      throw new Error("Network error. Please try again later.");
    }

    // redirect to login if not login
    if (error.response.status === 401) {
      // clear token, logout
      history.push("/login");
      localStorage.removeItem("access_token");
      return Promise.reject(error);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
