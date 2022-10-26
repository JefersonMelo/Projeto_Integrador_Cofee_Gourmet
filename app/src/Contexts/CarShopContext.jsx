import React, { createContext, useContext, useState } from "react";

export const newCarShopProvider = createContext();

export const CarShopProvider = ({ children }) => {
  const [shopContext, setShopContext] = useState({
    itemsCarShop: {},
  });

  return (
    <newCarShopProvider.Provider value={[shopContext, setShopContext]}>
      {children}
    </newCarShopProvider.Provider>
  );
};

export const useCarShopContext = () => useContext(newCarShopProvider);
