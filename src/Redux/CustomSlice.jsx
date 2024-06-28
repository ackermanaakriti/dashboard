// companySlice.js

import { createSlice } from "@reduxjs/toolkit";

export const customSlice =(name)=>
    {
        return createSlice({
  name,
  initialState: {
    allData: [],
    errors: [],
    loading: false
  },
  reducers: {
    setAllData(state, action) {
      state.allData = action.payload;
      state.errors = [];
      state.loading = false;
    },
    addError(state, action) {
      state.errors.push(action.payload);
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    deleteItem(state, action) {
      const idToDelete = action.payload;
      state.allData = state.allData.filter(item => item.id !== idToDelete);
    },
    updateItem(state, action) {
      const { id, newData } = action.payload;
      const index = state.allData.findIndex(item => item.id === id);
      if (index !== -1) {
        state.allData[index] = { ...state.allData[index], ...newData };
      }
    }
  }
  
})
    }
    
const companyDataSlice = customSlice("companyData");

export const {
     setAllData :companyAllData,
     addError:companyError, 
     setLoading:companyloading,
      deleteItem:companyDelete,
       updateItem:companyUpdate } = companyDataSlice.actions;

export const companyDataReducers= companyDataSlice.reducer