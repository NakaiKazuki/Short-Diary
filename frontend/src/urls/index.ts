const DEFAULT_API_LOCALHOST: string =
  process.env.REACT_APP_DEFAULT_API_LOCALHOST!;

export const home: string = `${DEFAULT_API_LOCALHOST}`;

// User関連のurl
const DEVISE_PATH: string = `${DEFAULT_API_LOCALHOST}/auth`;

export const registration: string = DEVISE_PATH;
export const signIn: string = `${DEVISE_PATH}/sign_in`;
export const signOut: string = `${DEVISE_PATH}/sign_out`;
export const guestSignIn: string = `${DEVISE_PATH}/guest_sign_in`;

// Diary
export const diary: string = `${DEFAULT_API_LOCALHOST}/diaries`;
export const photoGallery: string = `${DEFAULT_API_LOCALHOST}/photo_gallery`;

// Mail
export const CONTACT_PATH: string = `${DEFAULT_API_LOCALHOST}/contacts`;
export const contact: string = `${CONTACT_PATH}`;