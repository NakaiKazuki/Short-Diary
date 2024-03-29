import Cookies from "js-cookie";
// ユーザがログインしていたらtrueを返す
export const isLoggedIn = (user: ICurrentUser | undefined): boolean =>
  user != null;

export const removeUserCookies = () => {
  Cookies.remove("uid");
  Cookies.remove("client");
  Cookies.remove("access-token");
};

const twoWeeks = 14;

export const setUserCookies = (res: { headers: IHeaders }): void => {
  Cookies.set("client", res.headers["client"], { expires: twoWeeks });
  Cookies.set("uid", res.headers["uid"], { expires: twoWeeks });
  Cookies.set("access-token", res.headers["access-token"], {
    expires: twoWeeks,
  });
};
