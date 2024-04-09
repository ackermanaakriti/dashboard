import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const VoucherSlice = createSlice({
    name:'voucherD',
    initialState:{
        voucherType:[],
        voucherDetail:[],
        voucher:[]
            

        
    },
    reducers:{ // Corrected typo: 'reducers' instead of 'reuducers'
        addVoucherType:(state,action)=>
        {
            state.voucherType = [...state.voucherType, action.payload]; 
        },
        removeVoucherType: (state, action) => {
            const idToRemove = action.payload;
            state.voucherType = state.voucherType.filter(item => item?.id !== idToRemove);
        },
        editvouchertype: (state, action) => {
            console.log(action.payload);
            state.voucherType = state.voucherType.map(item =>
                item?.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        },
        addVoucher:(state,action)=>
        {
            state.voucher = [...state.voucher, action.payload]; 
        },
        addVoucherDetail:(state,action)=>
        {
            state.voucherDetail = [...state.voucherDetail, action.payload]; 
            // state.voucher.push( action.payload.id)
        },
        removeVoucherdetail:(state,action)=>
        {
            const idToRemove = action.payload;
            state.voucherDetail = state.voucherDetail.filter(item => item?.id !== idToRemove);
        }

        
    } 
})

export const {addVoucherType,removeVoucherType,editvouchertype,addVoucher,addVoucherDetail,removeVoucherdetail } = VoucherSlice.actions;
export default VoucherSlice.reducer;
