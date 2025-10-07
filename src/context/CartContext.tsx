import React, { createContext, useContext, useReducer } from "react";

type CartItem = { id: number; name: string; price: number };
type CartState = { items: CartItem[] };
type Action = { type: "ADD_ITEM"; payload: CartItem } | { type: "REMOVE_ITEM"; payload: number };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
