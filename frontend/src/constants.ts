// 型
interface IREQUEST_STATE {
  INITIAL: string;
  LOADING: string;
  OK: string;
}

interface IHTTP_STATUS_CODE {
  UNAUTHORIZED: number;
  UNPROCESSABLE: number;
}

export const REQUEST_STATE: IREQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
};

export const HTTP_STATUS_CODE: IHTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
  UNPROCESSABLE: 422,
};