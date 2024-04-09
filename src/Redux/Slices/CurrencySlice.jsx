import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const CurrencySlice = createSlice({
    name:'currency',
    initialState:[],
    reducers:{ // Corrected typo: 'reducers' instead of 'reuducers'
        addCurrency:(state,action)=>
        {
             state.push (action.payload)
             console.log(state)
            
        },
        removeCurrency:(state,action)=>
        {
            return state.filter((item)=>item?.id !== action.payload)
        }
        ,

      
        editCurrency: (state, action) => {
           console.log(action.payload)
            return state.map(item => item?.id === action.payload.id ? { ...item, ...action.payload } : item);
            
        },
    } 
})

export const {addCurrency,removeCurrency,editCurrency } = CurrencySlice.actions;
export default CurrencySlice.reducer;
