// src/features/postDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../Apis/Baseurl';
import { toast } from 'react-toastify';
import { useLayouData } from '../../Context/MainLayoutContext';


export const postData = createAsyncThunk(
  'postData/postData',
  async ({ url, values, name }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}${url}`, values, {
        headers: { Authorization: `Bearer ` },
      });
      toast.success(`${name} added successfully!`, {
        position: "bottom-center",
        autoClose: 5000,
      });
      return response.data;
    } catch (error) {
      toast.error(`Failed to add ${name}. Please try again later.`, {
        position: "bottom-center",
        autoClose: 5000,
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postDataSlice = createSlice({
  name: 'postData',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postDataSlice.reducer;
