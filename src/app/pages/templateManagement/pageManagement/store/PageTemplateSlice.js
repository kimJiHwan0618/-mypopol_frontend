import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postPopolInfo = createAsyncThunk(
  'site/post/popol-info',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/site/post/popol-info`,
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

export const updatePageTem = createAsyncThunk(
  'templateManage/put/page/update',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('fields', JSON.stringify(params.fields));
      params.files.profileImg &&
        formData.append(
          'profileImg',
          params.files.profileImg,
          encodeURIComponent(params.files.profileImg.name)
        );
      params.files.thumbnailImg &&
        formData.append(
          'thumbnailImg',
          params.files.thumbnailImg,
          encodeURIComponent(params.files.thumbnailImg.name)
        );
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/templatemanage/put/page/update`,
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
  'templateManage/post/page/work/add-update',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('fields', JSON.stringify(params.fields));
      params.files.titleImg !== null &&
        formData.append(
          'titleImg',
          params.files.titleImg,
          encodeURIComponent(params.files.titleImg.name)
        );
      formData.append(
        'posterImg',
        params.files.posterImg,
        encodeURIComponent(params.files.posterImg.name)
      );
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/templateManage/post/page/work/add-update`,
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
  'templateManage/delete/page/work',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}/templateManage/delete/page/work`,
        {
          params,
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
