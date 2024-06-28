import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Apis/Baseurl";

export const fetchChartofAccount = createAsyncThunk(
  'chartofAccount/fetchChartofAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`);
      console.log('API Response:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.response ? error.response.data : 'Network Error');
    }
  }
);



const chartOfAccountSlice = createSlice({
  name: 'chartofAccount',
  initialState: {
    chartofAccount: [],
    loading: false,
    error: null,
    chartofAccountTable:[]
  },
  reducers: {
    addChartOfAccount(state, action) {
      console.log(action.payload,'hello from redux heldfdsif')
      state.chartofAccount.push(action.payload);
    },
    deleteCharofAccount(state,action)
    {
      const deleteid = action.payload;
      state.chartofAccount = state.chartofAccount.filter(item=>item.id!==deleteid)
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
        state.chartofAccount = action.payload;
        console.log(state.chartofAccount)
      })
      .addCase(fetchChartofAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default chartOfAccountSlice.reducer;
export const { addChartOfAccount,deleteCharofAccount } = chartOfAccountSlice.actions;
