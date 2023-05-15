import { combineReducers } from '@reduxjs/toolkit';
import navigation from './navigationSlice';

const CommonReducers = combineReducers({
  navigation,
});

export default CommonReducers;
