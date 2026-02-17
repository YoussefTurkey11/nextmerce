import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isAuthDialogOpen: boolean;
};

const initialState: UIState = {
  isCartOpen: false,
  isWishlistOpen: false,
  isAuthDialogOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    openWishlist: (state) => {
      state.isWishlistOpen = true;
    },
    openAuthDialog: (state) => {
      state.isAuthDialogOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
    closeAuthDialog: (state) => {
      state.isAuthDialogOpen = false;
    },
  },
});

export const {
  openCart,
  openWishlist,
  openAuthDialog,
  closeCart,
  closeWishlist,
  closeAuthDialog,
} = uiSlice.actions;
export default uiSlice.reducer;
