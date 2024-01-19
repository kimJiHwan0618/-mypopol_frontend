import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sftpTest = createAsyncThunk(
  'dasobard/test',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/common/sftpTest`, params);
      return await response;
    } catch (error) {
      if (!error.response.data) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const setDashboard = createAsyncThunk('dasobard/setData', async (sftp, { dispatch, getState }) => {
  return sftp;
});

const initialState = {
  userRole: "",
  userId: "",
  userName: "",
};


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setDashboard.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectDashboard = ({ common }) => common.dashboard;

export default dashboardSlice.reducer;