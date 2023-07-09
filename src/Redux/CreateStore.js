import {configureStore} from '@reduxjs/toolkit';
import allReducers from './Reducers/index';

export default () => {
  const store = configureStore({
    reducer: allReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {},
      }),
  });

  return store;
};
