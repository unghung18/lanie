import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const items =
    Cookies.get("cartItems") !== undefined
        ? JSON.parse(Cookies.get("cartItems"))
        : [];

const totalAmount =
    Cookies.get("totalAmount") !== undefined
        ? JSON.parse(Cookies.get("totalAmount"))
        : 0;

const totalQuantity =
    Cookies.get("totalQuantity") !== undefined
        ? JSON.parse(Cookies.get("totalQuantity"))
        : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
    Cookies.set("cartItems", JSON.stringify(item));
    Cookies.set("totalAmount", JSON.stringify(totalAmount));
    Cookies.set("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
    cartItems: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        // =========== add item ============
        addItem(state, action) {
            const newItem = action.payload;
            console.log(newItem)
            const existingItem = state.cartItems.find(
                (item) => item._id == newItem._id
            );
            state.totalQuantity++;

            if (!existingItem) {
                state.cartItems.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price,
                    selectedColor: newItem.selectedColor,
                    selectedSize: newItem.selectedSize
                });
            } else {
                existingItem.selectedSize = newItem.selectedSize
                existingItem.selectedColor = newItem.selectedColor
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) + Number(newItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        // ========= remove item ========

        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item._id == id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item._id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) - Number(existingItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        //============ delete item ===========

        deleteItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item._id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );
            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
