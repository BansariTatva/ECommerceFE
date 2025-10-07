import React from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};
