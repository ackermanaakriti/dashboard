import { createSlice } from '@reduxjs/toolkit'

const TopTabSlice = createSlice({
  name: 'tabslice',
  initialState: {
    title:[]
  },
  reducers: {
    addTab:(state,action)=>
    {
      state.title.push(action.payload);
    }
 
  },
})

export const { addTab } = TopTabSlice.actions
export default TopTabSlice.reducer