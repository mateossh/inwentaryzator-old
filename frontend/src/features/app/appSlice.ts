import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface AppState {
//
// }
//
// const initialState: AppState = {
//
// }

type View = 'Home' | 'Stock' | 'ProductsList';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentView: 'Home',
  },
  reducers: {
    setCurrentView(state, action: PayloadAction<View>) {
      state.currentView = action.payload;
    },
  },
});

export const { setCurrentView } = appSlice.actions;

export default appSlice.reducer;
