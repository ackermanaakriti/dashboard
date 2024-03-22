import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer';


const TopTabSlice = createSlice({
  name: 'tabslice',
  initialState: {
    title:[],
    component:{}
  },
  reducers: {
    addTab:(state,action)=>
    {
      state.title.push(action.payload);
      state.component= action.payload;
    },
    removeTab: (state, action) => {
      state.title = state.title.filter(tab => tab !== action.payload);
     
    }
 
  },
})

export const { addTab,removeTab } = TopTabSlice.actions
export default TopTabSlice.reducer