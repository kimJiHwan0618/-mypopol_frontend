import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkAuthCode = createAsyncThunk(
  'common/auth-code',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/common/auth-code`, {
        params,
      });
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const postAuthCode = createAsyncThunk(
  'common/auth-code',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/common/auth-code`,
        params
      );
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const postUser = createAsyncThunk(
  'common/user',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/common/user`, params);
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getUser = createAsyncThunk(
  'common/user',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/common/user`, {
        params,
      });
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
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
