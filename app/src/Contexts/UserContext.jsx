import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../Services/storage";

export const newUserContext = createContext();

const initialState = {
  token: null,
  username: null,
  userid: null,
};

export const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(() =>
    getLocalStorage("userContext", initialState)
  );

  useEffect(() => {
    setLocalStorage("userContext", userContext);
  }, [userContext]);

  return (
    <newUserContext.Provider value={[userContext, setUserContext]}>
      {children}
    </newUserContext.Provider>
  );
};

export const useUserContext = () => useContext(newUserContext);
