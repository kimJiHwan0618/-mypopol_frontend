import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPageTemList = createAsyncThunk(
  'templateManage/page/list',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/templatemanage/page/list`,
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

// export const setUser = createAsyncThunk('user/setUser', async (user, { dispatch, getState }) => {
//   /*
//     You can redirect the logged-in user to a specific route depending on his role
//     */

//   return user;
// });

const initialState = {
  // userRole: "",
  // userId: "",
  // userName: "",
};

const pageTemplatesSlice = createSlice({
  name: 'pageTemplates',
  initialState,
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(setUser.fulfilled, (state, action) => {
  //       return action.payload;
  //     });
  // },
});

// export const selectUser = ({ common }) => common.user;

export default pageTemplatesSlice.reducer;
