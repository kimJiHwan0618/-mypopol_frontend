import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPopols = createAsyncThunk(
  'dashboard/popols',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/popols`,
        { params }
      );
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const getWorks = createAsyncThunk(
  'dashboard/works',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/works`,
        { params }
      );
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getVistors = createAsyncThunk(
  'dashboard/vistors',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/vistors`,
        { params }
      );
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getMails = createAsyncThunk(
  'dashboard/mails',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/dashboard/mails`,
        { params }
      );
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const testWss = createAsyncThunk(
  'dashboard/test',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/dashboard/home/get/test`,
        params
      );
      return await response;
    } catch (error) {
      return rejectWithValue(error.response);
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
