import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import { hideToast } from '../actions';

import '../stylesheets/ToastWrapper.css';

export const ToastWrapper = () => {
  const dispatch = useDispatch();

  const toasts = useSelector(state => state.toast.toasts);

  /* NOTE: I took aria things straight from bootstrap docs:
            https://getbootstrap.com/docs/4.3/components/toasts/#placement */

  return (
    <div
      className="toast-wrapper"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.length > 0 && toasts.map(toast => (
        <Toast
          className="p-1"
          show={toast.isVisible}
          onClose={() => dispatch(hideToast(toast.id))}
        >
        <Toast.Header>
          <strong className="mr-auto">{toast.title}</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
      ))}
    </div>
  );
}

export default ToastWrapper;
