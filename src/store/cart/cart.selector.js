import { createSelector } from "reselect";

const newCartCount = newCartItems.reduce(
  (currentTotal, item) => currentTotal + item.quantity,
  0
);
const newCartTotal = newCartItems.reduce(
  (currentTotal, item) => currentTotal + item.quantity * item.price,
  0
);
