import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const putUserPassword = createAsyncThunk(
  'common/user/password',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/common/user/password`,
        params
      );
      return await response;
    } catch (error) {
      if (!error.response.data) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  all: [],
  searchedFlag: false,
};

const forgotPwSlice = createSlice({
  name: 'forgotPw',
  initialState,
  reducers: {},
});

export default forgotPwSlice.reducer;
