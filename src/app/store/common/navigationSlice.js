import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import axios from 'axios';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = {};
const initialState = navigationAdapter.upsertMany(emptyInitialState, []);

export const getSideMenus = createAsyncThunk('common/sideMenus', async (user) => {
  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/common/sideMenus?roleId=${user.roleId}`);
  const data = await response.data;
  return JSON.parse(data.response.menuJson);
});

export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = (id) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};

export const {
  selectAll: selectNavigationAll,
  selectIds: selectNavigationIds,
  selectById: selectNavigationItemById,
} = navigationAdapter.getSelectors((state) => {
  return state.common.navigation;
});

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: navigationAdapter.setAll,
    resetNavigation: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSideMenus.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = (state) => state.user.role;

export const getNavigation = (state) => state.common.navigation;

export const selectNavigation = createSelector(
  [selectNavigationAll, () => getUserRole],
  (navigation, language, userRole) => {
    function setTranslationValues(data) {
      // loop through every object in the array
      return data.map((item) => {
        // see if there is a children node
        if (item.children) {
          // run this function recursively on the children array
          item.children = setTranslationValues(item.children);
        }
        return item;
      });
    }

    return setTranslationValues(
      _.merge(
        [],
        filterRecursively(navigation, (item) => FuseUtils.hasPermission(item.auth, userRole))
      )
    );
  }
);

function filterRecursively(arr, predicate) {
  return arr.filter(predicate).map((item) => {
    item = { ...item };
    if (item.children) {
      item.children = filterRecursively(item.children, predicate);
    }
    return item;
  });
}

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
  FuseUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
