import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";

export default configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})