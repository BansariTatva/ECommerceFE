import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';
import axios from 'axios';

type CartState = { items: CartItem[] };
type Action = { type: "ADD_ITEM"; payload: CartItem } | { type: "REMOVE_ITEM"; payload: number };

const initialState: CartState = { items: [] };

// Define the shape of a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the context shape
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch cart data from API when component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:8084/cart/getAllCartItems'); // Replace with your API endpoint
        setCart(response.data);
      } catch (err) {
        setError('Failed to fetch cart data. Please try again later.');
        console.error('Error fetching cart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);
  
const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );

  // const addToCart = (item: CartItem) => {
  //   setCart((prev) => {
  //     const existingItem = prev.find((i) => i.id === item.id);
  //     if (existingItem) {
  //       return prev.map((i) =>
  //         i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
  //       );
  //     }
  //     return [...prev, item];
  //   });
  // };

  // const updateQuantity = (id: number, quantity: number) => {
  //   if (quantity < 1) {
  //     removeFromCart(id);
  //     return;
  //   }
  //   setCart((prev) =>
  //     prev.map((item) => (item.id === id ? { ...item, quantity } : item))
  //   );
  // };

  // const removeFromCart = (id: number) => {
  //   setCart((prev) => prev.filter((item) => item.id !== id));
  // };

  // const getTotalPrice = () => {
  //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  // const getTotalItems = () => {
  //   return cart.reduce((total, item) => total + item.quantity, 0);
  // };

  // return (
  //   <CartContext.Provider
  //     value={{ cart, addToCart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems }}
  //   >
  //     {children}
  //   </CartContext.Provider>
  // );
};
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
