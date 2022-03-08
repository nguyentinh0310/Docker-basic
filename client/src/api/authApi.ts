import { ILogin, IToken } from "../types";
import axiosClient from "./axiosClient";

const authApi = {
  logIn(data: ILogin) {
    const url = "/auth";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "/auth/logout";
    return axiosClient.get(url);
  },
  getCurrentLogginUser(){
    const url = "/auth";
    return axiosClient.get(url);
  },
  refreshToken(data: IToken) {
    const url = "/auth/refresh-token";
    return axiosClient.post(url,data);
  },
  revokeToken(data: IToken) {
    const url = "/auth/revoke-token";
    return axiosClient.post(url,data);
  },
};
export default authApi;
