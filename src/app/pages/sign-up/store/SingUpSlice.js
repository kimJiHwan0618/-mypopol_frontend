import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAuthCode = createAsyncThunk(
  'auth/get/signUpCode',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/auth/get/signUpCode`,
        param
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

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
});

export default signUpSlice.reducer;
