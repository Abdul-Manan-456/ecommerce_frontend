import { createSlice } from "@reduxjs/toolkit";
import {
  findItemIndexById,
  getCartFromLocalStorage,
  setCartItems,
} from "./cartUtils";
type CheckoutCart = {
  product: any[];
  notes: string;
};
export interface CartItem {
  _id: string;
  items: any[];
  quantity: number;
  totalQuantity: number;
  totalPrice: number;
  price: number;
  checkoutCart: CheckoutCart
}
const initialState: CartItem = {
  _id: "",
  items: [],
  quantity: 1,
  totalQuantity: 0,
  totalPrice: 0,
  price: 0,
  checkoutCart: {
    product: [],
    notes: '',
  }
};
const getCartItems = () => {
  const getCart = localStorage.getItem("cart");
  if (getCart) {
    const parsedCart = JSON.parse(getCart);
    return parsedCart;
  } else {
    return [];
  }
};
function calculateTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const localItems = setCartItems(action.payload);
      state.items = localItems;
      state.totalQuantity = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    INCREMENT: (state, action) => {
      const cart = getCartFromLocalStorage();
      const itemId = action.payload._id;

      const itemIndex = findItemIndexById(cart, itemId);

      if (itemIndex != -1) {
        cart[itemIndex].quantity += 1;
      }
      const { totalQuantity, totalPrice } = calculateTotals(cart);

      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    // ----------------- GET CART ITEMS ----------------
    GET_CART_ITEMS: (state) => {
      const cart = localStorage.getItem("cart");
      const parsedCart = cart && JSON.parse(cart);
      if (parsedCart) {
        state.items = parsedCart;
        const { totalPrice, totalQuantity } = calculateTotals(state.items);
        state.totalPrice = totalPrice;
        state.totalQuantity = totalQuantity;
      }
    },
    REMOVE_CART_ITEMS: (state) => {
      localStorage.setItem('cart', JSON.stringify([]))
      state.items = [];
      state.totalQuantity = 0;
    },
    CHECKOUT_CART: (state, action) => {
      const cart = getCartFromLocalStorage();
      const product = cart.map((cartItem: CartItem) => (
        {
          product: cartItem._id,
          quantity: cartItem.quantity
        }
      ))
      state.checkoutCart = {
        product,
        notes: action.payload
      }
    },
    DECREMENT: (state, action) => {
      const cart = getCartFromLocalStorage();
      const itemId = action.payload._id;

      const itemIndex = findItemIndexById(cart, itemId);

      if (itemIndex != -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        }
      }
      const { totalQuantity, totalPrice } = calculateTotals(cart);

      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    REMOVE_FROM_CART: (state, action) => {
      const cart = getCartFromLocalStorage();
      const itemId = action.payload._id;
      const itemIndex = findItemIndexById(cart, itemId);

      if (itemIndex != -1) {
        cart.splice(itemIndex, 1);
      }
      const { totalQuantity, totalPrice } = calculateTotals(cart);
      state.items = cart
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export const {
  ADD_TO_CART,
  INCREMENT,
  DECREMENT,
  REMOVE_FROM_CART,
  REMOVE_CART_ITEMS,
  GET_CART_ITEMS,
  CHECKOUT_CART
} = cartSlice.actions;
export default cartSlice.reducer;
