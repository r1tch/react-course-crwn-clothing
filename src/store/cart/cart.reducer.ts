import { AnyAction } from "redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  setIsCartOpen,
} from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: Boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  if (setIsCartOpen.match(action))
    return {
      ...state,
      isCartOpen: action.payload,
    };

  if (
    addItemToCart.match(action) ||
    removeItemFromCart.match(action) ||
    clearItemFromCart.match(action)
  )
    return {
      ...state,
      cartItems: action.payload,
    };
  return state;
};
