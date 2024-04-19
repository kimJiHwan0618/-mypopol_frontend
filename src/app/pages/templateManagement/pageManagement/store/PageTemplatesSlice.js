import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPageTemList = createAsyncThunk(
  'templateManage/pages',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/templatemanage/pages`,
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

const initialState = {
  all: [],
  searchedFlag: false,
};

const pageTemplatesSlice = createSlice({
  name: 'pageTemplates',
  initialState,
  reducers: {
    setPageTemplates: (state, action) => {
      state.all = action.payload;
    },
    setSearchedFlag: (state, action) => {
      state.searchedFlag = action.payload;
    },
  },
});

export const { setPageTemplates, setSearchedFlag } = pageTemplatesSlice.actions;

export const selectSearchedFlag = (state) => state.pageTemplates.searchedFlag;
export const selectAllData = (state) => state.pageTemplates.all;

export default pageTemplatesSlice.reducer;
