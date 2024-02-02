import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postAuthCode = createAsyncThunk(
  'auth/post/signUpCode',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/auth/post/signup-code`,
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

export const postUser = createAsyncThunk(
  'auth/post/user',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/auth/post/user`,
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

export const getUser = createAsyncThunk(
  'auth/get/user',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/auth/get/user`, {
        params,
      });
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