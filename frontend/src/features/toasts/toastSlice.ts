import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CreateToastArgs {
  title: string,
  message: string,
}

export type Toast = CreateToastArgs & { id: number }

interface ToastsState {
  toasts: Toast[]
}

const initialState: ToastsState = {
  toasts: [],
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    createToast(state, action: PayloadAction<CreateToastArgs>) {
      const toast = {
        id: Date.now(),
        ...action.payload,
      };

      state.toasts.push(toast);
    },
    hideToast(state, action: PayloadAction<number>) {
      const toastIndex = state.toasts.findIndex(toast => toast.id === action.payload);
      state.toasts.splice(toastIndex, 1);
    },
  },
});

export const { createToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
