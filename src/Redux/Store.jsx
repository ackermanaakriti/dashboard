import { configureStore } from "@reduxjs/toolkit";
import TopTabSlice from "./TopTabSlice";

export const store  = configureStore({
    reducer:{
        'tabslice':TopTabSlice
    }
})