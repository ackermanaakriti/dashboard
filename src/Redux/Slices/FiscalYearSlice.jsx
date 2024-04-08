import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const FiscalYearSlice = createSlice({
    name:'fiscalyear',
    initialState:[],
    reducers:{ // Corrected typo: 'reducers' instead of 'reuducers'
        addFiscalYear:(state,action)=>
        {
             state.push (action.payload)
             console.log(state)
            
        },
        removeFiscalYear:(state,action)=>
        {
            return state.filter((item)=>item?.id !== action.payload)
        }
        ,

      
        editFiscalYear: (state, action) => {
           console.log(action.payload)
            return state.map(item => item?.id === action.payload.id ? { ...item, ...action.payload } : item);
            
        },
    } 
})

export const {addFiscalYear,removeFiscalYear,editFiscalYear } = FiscalYearSlice.actions;
export default FiscalYearSlice.reducer;
