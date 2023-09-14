import { combineReducers } from '@reduxjs/toolkit';
import navigation from './navigationSlice';
import loadingWrap from './loadingWrap';

const CommonReducers = combineReducers({
  navigation,
  loadingWrap
});

export default CommonReducers;
