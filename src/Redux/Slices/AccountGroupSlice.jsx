import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const Accountgroupslice = createSlice({
    name:'accgroup',
    initialState:[],
    reducers:{ // Corrected typo: 'reducers' instead of 'reuducers'
        addaccountGroup:(state,action)=>
        {
             state.push (action.payload)
             console.log(state)
            
        },
        removeAcctountgroup:(state,action)=>
        {
            return state.filter((item)=>item?.id !== action.payload)
        }
        ,

      
        editAccountgrp: (state, action) => {
           console.log(action.payload)
            return state.map(item => item?.id === action.payload.id ? { ...item, ...action.payload } : item);
            
        },
    } 
})

export const {addaccountGroup,removeAcctountgroup,editAccountgrp } = Accountgroupslice.actions;
export default Accountgroupslice.reducer;
