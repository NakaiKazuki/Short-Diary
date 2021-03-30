const DEFAULT_API_LOCALHOST: string = 'http://localhost:80/api/v1';
export const home: string = `${DEFAULT_API_LOCALHOST}/`;

// User関連のurl
const DEVISE_PATH: string = `${DEFAULT_API_LOCALHOST}/auth`
export const registration: string = DEVISE_PATH;
export const signIn: string = `${DEVISE_PATH}/sign_in`;
export const signOut: string = `${DEVISE_PATH}/sign_out`;
export const guestSignIn: string = `${DEVISE_PATH}/guest_sign_in`;