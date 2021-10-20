import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const itemToAdd = state.cartItems.find((item) => item.id === payload.id);
      if (itemToAdd) {
        itemToAdd.quantity += 1;
        toast.info(`${payload.name} in cart ${itemToAdd.quantity}`, {
          position: "bottom-left"
        });
      } else {
        const currentProduct = { ...payload, quantity: 1 };
        state.cartItems.push(currentProduct);
        toast.success(`${payload.name} added to cart`, {
          position: "bottom-left"
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, { payload }) {
      const nextCartItem = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${payload.name} removed from cart`, {
        position: "bottom-left"
      });
    },
    decreaseCarItem(state, { payload }) {
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === payload.id
      );

      if (itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;

        toast.info(`Decreased ${payload.name} cart quantity`, {
          position: "bottom-left"
        });
      } else if (itemToDecrease.quantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (item) => item.id !== payload.id
        );
        state.cartItems = nextCartItem;

        toast.error(`${payload.name} removed from cart`, {
          position: "bottom-left"
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, { payload }) {
      state.cartItems = [];
      toast.error(`Cart cleared`, {
        position: "bottom-left"
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal(state, { payload }) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  decreaseCarItem,
  clearCart,
  getTotal
} = cartSlice.actions;
export default cartSlice.reducer;
