import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Toast {
  id: string,
  title: string,
  message: string,
  isVisible: boolean,
}

const toastSlice = createSlice({
  name: 'toast',
  initialState: [],
  reducers: {
    createToast(state, action) {
      // @ts-ignore
      state.push(action.payload);
    },
    hideToast(state, action) {
      // @ts-ignore
      const toastIndex = state.findIndex(toast => toast.code === action.payload.code);
      // @ts-ignore
      state[toastIndex] = action.payload;


      // TODO: how to implement removing invisible toasts from state? thunk
    },
  },
});

export const { createToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
