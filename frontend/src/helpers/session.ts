// ユーザがログインしていたらtrueを返す
import Cookies from "js-cookie";
export const isLoggedIn = (user: ICurrentUser | undefined): boolean =>
  user != null;

export const removeUserCookies = () => {
  Cookies.remove("uid");
  Cookies.remove("client");
  Cookies.remove("access-token");
};
const twoWeeks = 60 * 60 * 24 * 7;
export const setUserCookies = (res: { headers: IHeaders }): void => {
  Cookies.set("client", res.headers["client"], { expires: twoWeeks });
  Cookies.set("uid", res.headers["uid"], { expires: twoWeeks });
  Cookies.set("access-token", res.headers["access-token"], {
    expires: twoWeeks,
  });
};

export const getCookie = (name: string): string => {
  return Cookies.get(name) ?? "";
};
