import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    addMultipleItems(state, action) {
      const { id } = action.payload;
      const checkExistingItems = state.find((item) => item.id === id);
      if (checkExistingItems) {
        checkExistingItems.quantity += 1;
      } else {
        state.push({ id, quantity: 1 });
      }
    },
  },
});
export const { add, remove, addMultipleItems } = cartSlice.actions;
export default cartSlice.reducer;
