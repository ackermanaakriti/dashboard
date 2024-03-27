import { createSlice } from '@reduxjs/toolkit';


const TopTabSlice = createSlice({
  name: 'tabslice',
  initialState: {
    title: [],
    component: {},
    menu:{}
  },
  reducers: {
    addTab: (state, action) => {
      state.title.push(action.payload);
      state.component= action.payload
     
    },
    removeTab: (state, action) => {
      const removedIndex = action.payload;
      console.log(removedIndex)
      if (state.title.length > 1) {
          let newActiveTab;
          if (removedIndex === 0) {
              //first tab removed hunda
              newActiveTab = 1;
          } else {
              //bichaa ko tab removed hunda
              newActiveTab = removedIndex > 0 ? removedIndex - 1 : 0;
              //last tab removed hunda
              if (removedIndex === state.title.length - 1) {
                  newActiveTab = removedIndex - 1;
              }
          }
          state.component = state.title[newActiveTab].menu;
          console.log(state.title[newActiveTab]);
      } else {
          state.component = ''; // euta matra tab baki huda
      }
      // Remove the tab from the tabs array
      state.title.splice(removedIndex, 1);
    },
    addMenu :(state,action)=>
    {
      state.menu= action.payload
    }
  },
});

export const { addTab, removeTab ,addMenu} = TopTabSlice.actions;
export default TopTabSlice.reducer;
