import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setSelectedContactId } from './contactsSlice';
import { getChats } from './chatsSlice';

export const getChat = createAsyncThunk(
  'chatPanel/chat/getChat',
  async (contactId, { dispatch, getState }) => {
    const response = await axios.get(`/api/chat/chats/${contactId}`);

    const data = await response.data;

    dispatch(setSelectedContactId(contactId));

    return data;
  }
);

export const sendMessage = createAsyncThunk(
  'chatPanel/chat/sendMessage',
  async ({ messageText, chatId, contactId }, { dispatch, getState }) => {
    const response = await axios.post(`/api/chat/chats/${contactId}`, messageText);

    const data = await response.data;

    dispatch(getChats());

    return data;
  }
);

const chatSlice = createSlice({
  name: 'chatPanel/chat',
  initialState: [],
  reducers: {
    removeChat: (state, action) => null,
    closeChatPanel: (state, action) => null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChat.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { removeChat } = chatSlice.actions;

export const selectChat = ({ chatPanel }) => chatPanel.chat;

export default chatSlice.reducer;
