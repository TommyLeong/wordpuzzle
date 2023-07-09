import {combineReducers} from '@reduxjs/toolkit';
import generalReducer from './GeneralReducer';

const allReducers = combineReducers({
  generalReducer: generalReducer,
});

export default allReducers;
