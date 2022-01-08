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

export const getCurrentUser = (ctx?: NextPageContext): UserData | null => {
  const userString = nookies.get(ctx)["currentUser"];
  console.log({ cookies: nookies.get(ctx), userString });

  try {
    const currentUser = JSON.parse(userString);
    return currentUser;
  } catch (e) {
    if (e instanceof SyntaxError) {
      return null;
    } else {
      throw e;
    }
  }
};
