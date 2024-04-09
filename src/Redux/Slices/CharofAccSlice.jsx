import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const ChartofAcc = createSlice({
    name:'charofacc',
    initialState:[],
    reducers:{ // Corrected typo: 'reducers' instead of 'reuducers'
        addChartofAcc:(state,action)=>
        {
             state.push (action.payload)
             console.log(state)
            
        },
        removeCharofAcc:(state,action)=>
        {
            return state.filter((item)=>item?.id !== action.payload)
        }
        ,

      
        editCharofAcc: (state, action) => {
           console.log(action.payload)
            return state.map(item => item?.id === action.payload.id ? { ...item, ...action.payload } : item);
            
        },
    } 
})

export const {addChartofAcc,removeCharofAcc,editCharofAcc } = ChartofAcc.actions;
export default ChartofAcc.reducer;
