import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import settingsConfig from 'app/configs/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { setUser, updateUserSettings } from 'app/store/userSlice';

export const changeFuseTheme = (theme) => (dispatch, getState) => {
  const { fuse } = getState();
  const { settings } = fuse;

  const newSettings = {
    ...settings.current,
    theme: {
      main: theme,
      navbar: theme,
      toolbar: theme,
      footer: theme,
    },
  };

  dispatch(setDefaultSettings(newSettings));
};

function getInitialSettings() {
  const defaultLayoutStyle =
    settingsConfig.layout && settingsConfig.layout.style
      ? settingsConfig.layout.style
      : 'mainLayout';
  const layout = {
    style: defaultLayoutStyle,
    config: themeLayoutConfigs[defaultLayoutStyle].defaults,
  };
  return _.merge({}, { layout }, settingsConfig);
}

export function generateSettings(_defaultSettings, _newSettings) {
  const response = _.merge(
    {},
    _defaultSettings,
    { layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
    _newSettings
  );

  return response;
}

const initialSettings = getInitialSettings();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
};

export const setDefaultSettings = createAsyncThunk(
  'fuse/settings/setDefaultSettings',
  async (val, { dispatch, getState }) => {
    const { fuse } = getState();
    const { settings } = fuse;
    const defaults = generateSettings(settings.defaults, val);

    dispatch(updateUserSettings(defaults));

    return {
      ...settings,
      defaults: _.merge({}, defaults),
      current: _.merge({}, defaults),
    };
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      const current = generateSettings(state.defaults, action.payload);

      return {
        ...state,
        current,
      };
    },

    setInitialSettings: (state, action) => {
      return _.merge({}, initialState);
    },
    resetSettings: (state, action) => {
      return {
        ...state,
        defaults: _.merge({}, state.defaults),
        current: _.merge({}, state.defaults),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setDefaultSettings.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        const defaults = generateSettings(state.defaults, action.payload?.data?.settings);
        return {
          ...state,
          defaults: _.merge({}, defaults),
          current: _.merge({}, defaults),
        };
      });
  },
});

export const selectFuseCurrentSettings = ({ fuse }) => fuse.settings.current;

export const selectFuseCurrentLayoutConfig = ({ fuse }) => fuse.settings.current.layout.config;

export const selectFuseDefaultSettings = ({ fuse }) => fuse.settings.defaults;
export const { resetSettings, setInitialSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
