import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const getChats = createAsyncThunk('chatPanel/chats/getChats', async (params) => {
  const response = await axios.get('/api/chat/chats', { params });
  const data = await response.data;

  return data;
});

const chatsAdapter = createEntityAdapter({});

export const { selectAll: selectChats, selectById: selectChatById } = chatsAdapter.getSelectors(
  (state) => state.chatPanel.chats
);

const chatsSlice = createSlice({
  name: 'chatPanel/chats',
  initialState: chatsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default chatsSlice.reducer;
