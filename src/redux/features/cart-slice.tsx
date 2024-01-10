import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemProps } from "@/app/types/types";

interface CartState {
  items: CartItemProps[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItemProps>) => {
      state.items.push(action.payload);
    },
    removeItem: (state: CartState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: CartItemProps) => item.id !== action.payload);
    },
    updateQuantity: (state: CartState, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item: CartItemProps) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;