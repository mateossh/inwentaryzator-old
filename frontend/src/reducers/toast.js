const defaultState = {
  toasts: [],
}

export const toast = (state = defaultState, action) => {
  switch (action.type) {
  case 'ADD_TOAST':
    return {
      ...state,
      toasts: [...state.toasts, action.toast],
    };
  case 'HIDE_TOAST':
    /*
     * toast = { id, title, message, isVisible }
     */

    const toastToHide = state.toasts.find(toast => toast.id === action.toastId);
    const toastsWithoutHidden = state.toasts.filter(toast => toast.id !== action.toastId);

    toastToHide.isVisible = false;

    return {
      ...state,
      toasts: [...toastsWithoutHidden, toastToHide],
    };
  default:
    return state;
  }
};
