type TUrl = string;

const DEFAULT_API_LOCALHOST: TUrl = 'http://localhost:80/api/v1';
export const home: TUrl = `${DEFAULT_API_LOCALHOST}/`;

// User関連のurl
const DEVISE_PATH: TUrl = `${DEFAULT_API_LOCALHOST}/auth`
export const registration: TUrl = DEVISE_PATH;
export const signIn: TUrl = `${DEVISE_PATH}/sign_in`;
export const signOut: TUrl = `${DEVISE_PATH}/sign_out`;
export const guestSignIn: TUrl = `${DEVISE_PATH}/guest_sign_in`;