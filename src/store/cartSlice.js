import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMultipleItems(state, action) {
      const { id, quantity, product, price } = action.payload; // destructure payload here
      const checkExistingItems = state.find(
        (item) => item.product && item.product.id === id
      );
      if (checkExistingItems) {
        checkExistingItems.quantity += quantity;
        checkExistingItems.totalPrice =
          checkExistingItems.product.price * checkExistingItems.quantity;
      } else {
        const totalPrice = price * quantity; // use the passed price
        state.push({ product, quantity, totalPrice });
      }
    },

    remove(state, action) {
      return state.filter((item) => item.product.id !== action.payload);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.find(
        (item) => item.product.id === productId
      );

      if (productToUpdate) {
        productToUpdate.quantity = quantity;
        productToUpdate.totalPrice = productToUpdate.product.price * quantity;
      }
    },

    // add(state, action) {
    //   state.push(action.payload);
    // },
    // addMultipleItems(state, action) {
    //   const { id, quantity } = action.payload;
    //   const checkExistingItems = state.find(
    //     (item) => item.product && item.product.id === id
    //   );
    //   if (checkExistingItems) {
    //     checkExistingItems.quantity += quantity;
    //     checkExistingItems.totalPrice =
    //       checkExistingItems.product.price * checkExistingItems.quantity;
    //   } else {
    //     const { product } = action.payload;
    //     const totalPrice = product.price * quantity;
    //     state.push({ product, quantity, totalPrice });
    //   }
    // },
  },
});

export const { remove, addMultipleItems, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
