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
  GET_CONTACTS_BY_USER_ID: "/get/contacts/%user_id%",
  GET_ADDRESS_BY_USER_ID: "/get/address/%user_id%",
  GET_CONTACTS_AND_ADDRESS_BY_USER_ID: "/get/contacts/address/user/%user_id%",
  // GET_USER_BY_EMAIL: "/user/email/%user_email%",
  GET_LOGIN: "/login",
  GET_ALL_ITEMS_BY_USER_ID: "/%user_id%/items/",
  GET_ALL_ITEMS: "/items/",

  /*CONTACTS*/
  ADD_NEW_CONTACTS_BY_USER_ID: '/add/new/contact/user/%user_id%',
  GET_CONTACTS_BY_USER_ID: '/get/contact/user/%user_id%',

  /*ADDRESS*/
  ADD_NEW_ADDRESS_BY_USER_ID: '/add/new/address/user/%user_id%',
  GET_ADDRESS_BY_USER_ID: '/get/address/user/%user_id%',


  /*CATEGORY*/

  /*PRODUCT TYPE*/

  /*PRODUCT SUBTYPE*/

  /*PRODUCTS*/
  GET_ALL_PRODUCTS: "/get/all/products",  

  /*CAR SHOP*/
  ADD_NEW_ITEM_IN_CAR_SHOP: "/add/new/product/in/car/shop",
  GET_CAR_SHOP_BY_USER_ID: "/get/car/shop/%user_id%",
  DELETE_ITEM_CAR_SHOP: "/del/item/car/shop"

  /*PAYMENT*/

};
