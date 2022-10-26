import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../Services/storage";

export const newAuthenticationContext = createContext();

const defaultValues = {
  token: null,
  username: null,
  userid: null,
};

export const AuthenticationProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(() =>
    getLocalStorage("authContext", defaultValues)
  );

  useEffect(() => {
    setLocalStorage("authContext", authContext);
  }, [authContext]);

  return (
    <newAuthenticationContext.Provider
      value={[authContext, setAuthContext]}
    >
      {children}
    </newAuthenticationContext.Provider>
  );
};

export const useAuthContext = () => useContext(newAuthenticationContext);
