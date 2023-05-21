import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import storage from 'redux-persist/es/storage'
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const reducer = combineReducers({
    cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
});

export default store;