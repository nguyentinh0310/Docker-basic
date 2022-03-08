export interface PaginationParams {
  total: number;
  page: number;
  pageSize: number;
}

export interface ListResponse<T> {
  items: T[];
  pagination: PaginationParams;
}

export interface IToken {
  refreshToken: string;
}
export interface INotification {
  _id: string;
  message: string;
  date: number;
  read: boolean;
}


export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

