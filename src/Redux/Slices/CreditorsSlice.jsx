import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Apis/Baseurl";

export const fetchCreditorsData = createAsyncThunk(
  'chartofAccount/fetchChartofAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}Creditors/GetAll?isDeleted=${false}`);
      console.log('API Response:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.response ? error.response.data : 'Network Error');
    }
  }
);



const CreditorsSlice = createSlice({
  name: 'creditorsdata',
  initialState: {
    creditors: [],
    loading: false,
    error: null,
    chartofAccountTable:[]
  },
  reducers: {
    AddCreditors(state, action) {
      console.log(action.payload,'hello from redux heldfdsif')
      state.creditors.push(action.payload);
    },
    DeleteCreditors(state,action)
    {
      const deleteid = action.payload;
      state.creditors = state.creditors.filter(item=>item.id!==deleteid)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartofAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartofAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.creditors = action.payload;
        console.log(state.creditors)
      })
      .addCase(fetchChartofAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default CreditorsSlice.reducer;
export const { AddCreditors,DeleteCreditors } = CreditorsSlice.actions;
