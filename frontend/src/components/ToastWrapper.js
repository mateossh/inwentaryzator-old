import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../actions';

export const ToastWrapper = () => {
  const dispatch = useDispatch();
  const toasts = useSelector(state => state.toast.toasts);

  // NOTE: Aria things are from react-bootstrap
  // https://getbootstrap.com/docs/4.3/components/toasts/#placement

  return (
    <div
      className="m-0 fixed top-4 right-4 z-50"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts?.map(toast => (
        <div
          className={`mb-2 p-2 max-w-xl bg-white border rounded ${toast.isVisible ? '' : 'hidden'}`}
          key={toast.id}
        >
          <div className="px-1 m-0 text-gray-800 font-semibold flex flex-row justify-between">
            <div className="text-sm leading-6">{toast.title}</div>
            <button className="-mt-1 text-lg" onClick={() => dispatch(hideToast(toast.id))}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <hr className="my-1 w-full" />
          <div className="mx-1 mt-2 mb-1 text-sm">
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToastWrapper;
