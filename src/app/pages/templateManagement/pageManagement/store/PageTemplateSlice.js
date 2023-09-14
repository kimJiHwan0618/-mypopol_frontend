import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPopolInfo = createAsyncThunk(
  'site/popolInfo',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/site/popolInfo`, param);
      return await response;
    } catch (error) {
      if (!error.response.data) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
)

export const updatePageTem = createAsyncThunk(
  'templateManage/page/update',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('fields', JSON.stringify(param.fields));
      formData.append('profileImg', param.files.profileImg);
      formData.append('thumbnailImg', param.files.thumbnailImg);
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/templatemanage/page/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

export const addOrUpdateWork = createAsyncThunk(
  'templateManage/page/work/addOrUpdate',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('fields', JSON.stringify(param.fields));
      formData.append('titleImg', param.files.titleImg);
      formData.append('posterImg', param.files.posterImg);
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/templateManage/page/work/addOrUpdate`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

export const deleteWork = createAsyncThunk(
  'templateManage/page/work/delete',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/templateManage/page/work/delete`, param);
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
  // userRole: "",
  // userId: "",
  // userName: "",
};

const pageTemplateSlice = createSlice({
  name: 'pageTemplate',
  initialState,
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(setUser.fulfilled, (state, action) => {
  //       return action.payload;
  //     });
  // },
});

// export const selectUser = ({ common }) => common.user;

export default pageTemplateSlice.reducer;
