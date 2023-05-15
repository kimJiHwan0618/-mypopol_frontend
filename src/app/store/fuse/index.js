import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import settings from './settingsSlice';

const fuseReducers = combineReducers({
  settings,
  navbar,
  message,
  dialog,
});

export default fuseReducers;
