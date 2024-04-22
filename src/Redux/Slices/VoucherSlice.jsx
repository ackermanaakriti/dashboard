import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const VoucherSlice = createSlice({
    name:'voucherData',
    initialState:{
        voucherType:[],
       
        voucher:
        [
            {
                voucherDetail:[]
            }
        ]
        
            

        
    },
    reducers:{ 
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
            console.log(action.payload)
            
        },
        removeVoucher:(state,action)=>
        {
            const idToRemove = action.payload;
            state.voucher = state.voucher.filter(item => item?.id !== idToRemove);
        },
        editVoucher: (state, action) => {
            console.log(action.payload);
            state.voucher = state.voucher.map(item =>
                item?.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        },
        
        addVoucherDetail: (state, action) => {
            
            const voucherIndex = state.voucher.findIndex(voucher => voucher.uid === action.payload.uid);
            console.log(voucherIndex)
            if (voucherIndex !== -1) {
                state.voucher[voucherIndex].voucherDetail.push(action.payload);
            }
        },
        removeVoucherdetail:(state,action)=>
        {
            const idToRemove = action.payload;
            state.voucherDetail = state.voucherDetail.filter(item => item?.id !== idToRemove);
        }

        
    } 
})

export const {addVoucherType,removeVoucherType,editvouchertype,addVoucher,addVoucherDetail,removeVoucherdetail,removeVoucher,editVoucher } = VoucherSlice.actions;
export default VoucherSlice.reducer;
