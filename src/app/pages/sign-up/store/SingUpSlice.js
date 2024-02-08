import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postAuthCode = createAsyncThunk(
  'common/post/signUpCode',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/common/post/signup-code`,
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
  'common/post/user',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/common/post/user`,
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
  'common/get/user',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/common/get/user`, {
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
