'use client'
import store from "./store";
import { Provider } from "react-redux";
import React from 'react'

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>{children}</Provider>
    )
}

export default ReduxProvider;