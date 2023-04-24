const DEFAULT_API_LOCALHOST: string | undefined =
  process.env.REACT_APP_DEFAULT_API_LOCALHOST;

export const home = `${DEFAULT_API_LOCALHOST}`;
export const base = process.env.REACT_APP_BASE_URL;
// User関連のurl
const DEVISE_PATH = `${DEFAULT_API_LOCALHOST}/auth`;

export const registration: string = DEVISE_PATH;
export const signIn = `${DEVISE_PATH}/sign_in`;
export const signOut = `${DEVISE_PATH}/sign_out`;
export const guestSignIn = `${DEVISE_PATH}/guest_sign_in`;
export const userLogin = `${DEVISE_PATH}/user_login`;
export const password = `${DEVISE_PATH}/password`;
// Diary
export const diary = `${DEFAULT_API_LOCALHOST}/diaries`;
export const photoGallery = `${DEFAULT_API_LOCALHOST}/photo_gallery`;

export const CONTACT_PATH = `${DEFAULT_API_LOCALHOST}/contacts`;
export const contact = `${CONTACT_PATH}`;
