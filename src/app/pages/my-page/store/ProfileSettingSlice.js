import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const putProfileImg = createAsyncThunk(
  'my-page/profile/post/profile-img',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      params.file &&
        formData.append('profileImg', params.file, encodeURIComponent(params.file.name));
      formData.append('oldFileName', params.oldFileName);
      formData.append('userId', params.userId);
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/my-page/profile/post/profile-img`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return await response;
    } catch (error) {
      console.log(error);
      if (!error.response.data) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const putProfileInfo = createAsyncThunk(
  'my-page/profile/put/profile-info',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/my-page/profile/put/profile-info`,
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
