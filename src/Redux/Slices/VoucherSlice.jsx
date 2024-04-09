import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const VoucherSlice = createSlice({
    name:'voucher',
    initialState:[],
    reducers:{ // Corrected typo: 'reducers' instead of 'reuducers'
        addVoucherType:(state,action)=>
        {
             state.push (action.payload)
             console.log(state)
            
        },
        removeVoucherType:(state,action)=>
        {
            return state.voucherType.filter((item)=>item?.id !== action.payload)
        }
        ,

      
        editvouchertype: (state, action) => {
           console.log(action.payload)
            return state.voucherType.map(item => item?.id === action.payload.id ? { ...item, ...action.payload } : item);
            
        },
    } 
})

export const {addVoucherType,removeVoucherType,editvouchertype } = VoucherSlice.actions;
export default VoucherSlice.reducer;
