import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPopols = createAsyncThunk(
  'dashboard/home/get/popols',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/home/get/popols`,
        { params }
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
export const getWorks = createAsyncThunk(
  'dashboard/home/get/works',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/home/get/works`,
        { params }
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

export const getVistors = createAsyncThunk(
  'dashboard/home/get/vistors',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/home/get/vistors`,
        { params }
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

export const getMails = createAsyncThunk(
  'dashboard/home/get/mails',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/home/get/mails`,
        { params }
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

export const testWss = createAsyncThunk(
  'dashboard/home/get/test',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/home/get/test`,
        {
          params,
          headers: {
            'session-id': 'your-session-id',
          },
        }
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
  popols: [],
  works: [],
  vistors: [],
  mails: [],
  searchedFlag: {
    popols: false,
    works: false,
    vistors: false,
    mails: false,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPopols: (state, action) => {
      state.popols = action.payload;
    },
    setWorks: (state, action) => {
      state.works = action.payload;
    },
    setVistors: (state, action) => {
      state.vistors = action.payload;
    },
    setMails: (state, action) => {
      state.mails = action.payload;
    },
    setSearchedFlag: (state, action) => {
      state.searchedFlag = {
        ...state.searchedFlag,
        ...action.payload,
      };
    },
  },
});

export const { setPopols, setWorks, setVistors, setMails, setSearchedFlag } =
  dashboardSlice.actions;
export const selectPopols = (state, ptid) =>
  ptid ? state.dashboard.popols.filter((popol) => popol.ptid === ptid) : state.dashboard.popols;
export const selectWorks = (state, ptid) =>
  ptid ? state.dashboard.works.filter((work) => work.ptid === ptid) : state.dashboard.works;
export const selectVistors = (state, ptid) =>
  ptid ? state.dashboard.vistors.filter((vistor) => vistor.ptid === ptid) : state.dashboard.vistors;
export const selectMails = (state, ptid) =>
  ptid ? state.dashboard.mails.filter((mail) => mail.ptid === ptid) : state.dashboard.mails;
export const selectSearchedFlag = (state) => state.dashboard.searchedFlag;

export default dashboardSlice.reducer;
