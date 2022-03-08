import { IUser, ListResponse, PaginationParams } from "../types";
import axiosClient from "./axiosClient";

export interface userSate {
  data: IUser[];
  pagination: PaginationParams;
}

export const userApi = {
  getAll(): Promise<IUser[]> {
    const url = "/users";
    return axiosClient.get(url);
  },
  getUserPaging(
    currentPage: number,
    params?: any
  ): Promise<ListResponse<IUser>> {
    const url = `/users/paging/${currentPage}`;
    return axiosClient.get(url, { params });
  },
  getById(id: string | number): Promise<IUser> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  add(data: IUser): Promise<IUser> {
    const url = `/users`;
    return axiosClient.post(url, data);
  },
  update(data: IUser): Promise<IUser> {
    const url = `/users/${data._id}`;
    return axiosClient.put(url, data);
  },
  remove(id: string | number): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
  removeMany(ids: string[]): Promise<any> {
    const url = `/users`;
    return axiosClient.delete(url, { data: ids });
  },
};
