import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../Services/storage";

export const newAppProductContext = createContext();

export const defaultValues = {
  products: [],
  key: "productContext",
};

export const ProductProvider = ({ children }) => {
  const [productContext, setProductContext] = useState(() =>
    getLocalStorage("productContext", defaultValues)
  );

  useEffect(() => {
    setLocalStorage("productContext", productContext);
  }, [productContext]);

  return (
    <newAppProductContext.Provider value={[productContext, setProductContext]}>
      {children}
    </newAppProductContext.Provider>
  );
};

export const useProductContext = () => useContext(newAppProductContext);
