/*import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedItems = [...state.items];
      const itemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex === -1) {
        updatedItems.push({ ...action.payload, quantity: 1 });
      } else {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + 1,
        };
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return { ...state, items: updatedItems };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = [...state.items];
      const itemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        if (updatedItems[itemIndex].quantity > 1) {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity: updatedItems[itemIndex].quantity - 1,
          };
        } else {
          updatedItems.splice(itemIndex, 1);
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART": {
      localStorage.removeItem("cartItems");
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export default useCart;*/

// src/components/ui/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer, initialState } from "./CartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
