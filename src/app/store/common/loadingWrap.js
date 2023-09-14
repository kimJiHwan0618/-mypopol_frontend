import { createSlice } from '@reduxjs/toolkit';

const loadingWrap = createSlice({
  name: 'loadingWrap',
  initialState: {
    state: false,
    options: {
      children: 'Hi',
    },
  },
  reducers: {
    open: (state, action) => {
      state.state = true;
    },
    close: (state, action) => {
      state.state = false;
    },
  },
});

export const { open, close } = loadingWrap.actions;

export const selectLoadingWrapState = ({ common }) => common.loadingWrap.state;
export default loadingWrap.reducer;