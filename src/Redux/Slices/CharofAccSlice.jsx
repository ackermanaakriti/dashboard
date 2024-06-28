// // import React from "react";
// // import { createSlice } from "@reduxjs/toolkit";
// // import storage from 'redux-persist/lib/storage';
// // import { persistReducer, persistStore } from 'redux-persist';

// // const ChartofAcc = createSlice({
// //     name:'charofacc',
// //     initialState:[],
// //     reducers:{
// //         addChartofAcc:(state,action)=>
// //         {
// //              state.push (action.payload)
// //              console.log(state)
            
// //         },
// //         removeCharofAcc:(state,action)=>
// //         {
// //            state = state.filter((data)=>data !== data.id)
// //         }
// //         ,

      
// //         editCharofAcc: (state, action) => {
// //            console.log(action.payload)
// //             return state.map(item => item?.id === action.payload.id ? { ...item, ...action.payload } : item);
            
// //         },
// //     } 
// // })

// // export const {addChartofAcc,removeCharofAcc,editCharofAcc } = ChartofAcc.actions;
// // export default ChartofAcc.reducer;
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { ApiGetRequest } from "../hooks/apiGetRequest";
// export const fetchBrandData = createAsyncThunk(
//   "brand/fetchBrand",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await ApiGetRequest("Brand/getAllBrand");
//       return response;
//     } catch (err) {
//       return rejectWithValue("Error");
//     }
//   }
// );
// const brandSlice = createSlice({
//   name: "brand",
//   initialState: {
//     brandList: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     addBrand(state, action) {
//       if (state.brandList) {
//         const updatedBrandList = [action.payload, ...state.brandList];
//         state.brandList = updatedBrandList;
//       } else {
//         state.brandList = [action.payload];
//       }
//     },
//     updateBrand(state, action) {
//       console.log(action.payload);
//       const newBrandList = state.brandList.filter(
//         (data) => data.id !== action.payload.id
//       );
//       const updatedBrandList = [
//         {
//           id: action.payload.id,
//           name: action.payload.name,
//           manufactureName: action.payload.manufactureName,
//         },
//         ...newBrandList,
//       ];
//       state.brandList = updatedBrandList;
//     },
//     deleteBrand(state, action) {
//       const newBrandList = state.brandList.filter(
//         (data) => data.id !== action.payload
//       );
//       state.brandList = newBrandList;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBrandData.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchBrandData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.brandList = action.payload;
//       })
//       .addCase(fetchBrandData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });
// export const { addBrand, deleteBrand, updateBrand } = brandSlice.actions;
// export const brandReducer = brandSlice.reducer;
