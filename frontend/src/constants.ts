// 型
interface IREQUEST_STATE {
  INITIAL: 'INITIAL';
  LOADING: 'LOADING';
  OK: 'OK';
}

interface IHTTP_STATUS_CODE {
  UNAUTHORIZED: 401;
  FORBIDDEN: 403;
  UNPROCESSABLE: 422;
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