function definesApiUrl() {
  if (window.location.origin.indexOf("localhost") === -1) {
    return "https://api-mycoffeebreakgourmet.herokuapp.com";
  }

  return "http://localhost:8999";

}

export const apiURL = `${definesApiUrl()}/api`;

export const apiRouts = {
  /*USERS*/
  CREATE_USER: "/create/user/",
  GET_ALL_USERS: "/all/users/",
  GET_USER_BY_ID: "/id/%user_id%",
  GET_LOGIN: "/login",

  /*CONTACTS*/
  ADD_NEW_CONTACTS_BY_USER_ID: '/add/new/contact/user/%user_id%',
  EDIT_CONTACTS_BY_USER_ID: "/edit/contacts/user/%user_id%",
  GET_CONTACTS_BY_USER_ID: "/get/contacts/user/%user_id%",


  /*ADDRESS*/
  ADD_NEW_ADDRESS_BY_USER_ID: '/add/new/address/user/%user_id%',
  EDIT_ADDRESS_BY_USER_ID: '/edit/address/user/%user_id%',
  GET_ADDRESS_BY_USER_ID: "/get/address/user/%user_id%",

  /*IDENTIFICATION*/
  ADD_IDENTIFICATION_BY_USER_ID: '/add/new/identification/user/%user_id%',
  EDIT_IDENTIFICATION_BY_USER_ID: '/add/new/identification/user/%user_id%',
  GET_IDENTIFICATION_BY_USER_ID: '/get/identification/user/%user_id%',


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
