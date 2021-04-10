// 型
interface IREQUEST_STATE {
  INITIAL: string;
  LOADING: string;
  OK: string;
}

interface IHTTP_STATUS_CODE {
  UNAUTHORIZED: number;
  UNPROCESSABLE: number;
  FORBIDDEN: number;
}

export const REQUEST_STATE: IREQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
};

export const HTTP_STATUS_CODE: IHTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE: 422,
};