function definesApiUrl() {
  if (window.location.origin.indexOf("localhost") === -1) {
    return window.location.origin;
  }
  return "http://localhost:8999";
}

export const appVersion = "1.0.0";
export const appName = "Coffee Gourmet";
export const webURL = window.location.origin;
export const apiURL = `${definesApiUrl()}/api`;

export const apiRouts = {
  /*USERS*/
  CREATE_USER: "/create/user/",
  GET_ALL_USERS: "/all/users/",
  GET_USER_BY_ID: "/id/%user_id%",
  // GET_USER_BY_EMAIL: "/user/email/%user_email%",
  GET_LOGIN: "/login",
  GET_ALL_ITEMS_BY_USER_ID: "/%user_id%/items/",
  GET_ALL_ITEMS: "/items/",

  /*CATEGORY*/

  /*PRODUCT TYPE*/

  /*PRODUCT SUBTYPE*/

  /*PRODUCTS*/
  GET_ALL_PRODUCTS: "/get/all/products"

};
