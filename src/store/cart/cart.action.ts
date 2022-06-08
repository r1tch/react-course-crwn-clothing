import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type CartAction = SetIsCartOpen | SetCartItems;

export const setIsCartOpen = withMatcher(
  (isOpen: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)
);

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  if (!cartItems)
     cartItems = [];

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  if (!cartItems)
     cartItems = [];

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  if (!cartItems)
     cartItems = [];
     
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};
export const addItemToCart = withMatcher(
  (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  }
);

export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  }
);
export const clearItemFromCart = withMatcher(
  (cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  }
);
