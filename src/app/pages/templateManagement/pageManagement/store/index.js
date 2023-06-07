import { combineReducers } from '@reduxjs/toolkit';
import pageTemplates from './PageTemplatesSlice';
// import pageTemplate from './PageTemplateSlice';

const reducer = combineReducers({
  pageTemplates,
  // pageTemplate,
});

export default reducer;