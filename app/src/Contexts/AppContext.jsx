import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const defaultValues = {
  drawerOpened: false,
  drawerWidth: 240,
  refresh: false,
  warningsAndErrors: true,
  warning: {
    opened: false,
    type: "error",
    msg: "unknown",
  },
};

export const AppProvider = ({ children }) => {
  const [appContext, setAppContext] = useState(defaultValues);

  return (
    <AppContext.Provider value={[appContext, setAppContext]}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
