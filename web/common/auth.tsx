import { NextPageContext } from "next";
import nookies, { parseCookies, setCookie } from "nookies";

import { UserData } from "./types";

interface CustomCookies {
  currentUser: UserData;
}

export const saveCurrentUser = (user: UserData): void => {
  // Assuming this is client side
  // because only the client calls authentication API
  setCookie(null, "currentUser", JSON.stringify(user));
};

export const useMe = (ctx?: NextPageContext): UserData | null => {
  const userString = nookies.get(ctx)["currentUser"];

  try {
    const currentUser: UserData = JSON.parse(userString);
    return currentUser;
  } catch (e) {
    if (e instanceof SyntaxError) {
      return null;
    } else {
      throw e;
    }
  }
};

export const getSession = (ctx?: NextPageContext): string | null => {
  const cookies = nookies.get(ctx);
  const { session } = cookies;
  console.log({ cookies, session: cookies.session });

  if (typeof session === "undefined") {
    console.log("undefined error", { cookies, session: cookies.session });
    throw TypeError("no session");
  }

  return session;
};
