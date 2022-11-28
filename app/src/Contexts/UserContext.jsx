import React, { createContext, useContext, useState } from "react";

export const newUserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({
    contacts: null,
    address: null,
    identification: null,
    creditcard: null,
    tests: null,
  });

  return (
    <newUserContext.Provider value={[userContext, setUserContext]}>
      {children}
    </newUserContext.Provider>
  );
};

export const useUserContext = () => useContext(newUserContext);
