import {createSlice} from '@reduxjs/toolkit';

const intialState = {
  Cities: ['venice', 'bangkok', 'barcelona', 'tokyo', 'miami'],
  Foods: ['hamburger', 'rice', 'noodles', 'sushi'],
  Animals: ['cow', 'elephant', 'tiger', 'lion', 'dog'],
  currentPuzzleCount: 0,
};

export const reducerGeneral = createSlice({
  name: 'generalReducer',
  initialState: intialState,
  reducers: {
    resetEverything: () => intialState,
    setCurrPuzzleCount: (state, action) => {
      state.currentPuzzleCount = action.payload;
    },
  },
});

export const {setCurrPuzzleCount, resetEverything} = reducerGeneral.actions;

export default reducerGeneral.reducer;
