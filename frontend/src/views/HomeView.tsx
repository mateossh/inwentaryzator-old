import React from 'react';
import { useAppDispatch } from '../hooks';
import { createToast } from '../features/toasts/toastSlice';

export const HomeView = () => {
  const dispatch = useAppDispatch();

  const addToastButton = () => {
    const toast = {
      title: 'title',
      message: 'something something blah blah blah',
    };

    dispatch(createToast(toast));
  };

  return (
    <React.Fragment>
      <h1>Inwentaryzator</h1>

      <button
        onClick={addToastButton}
      >
        Add toast 
      </button>
    </React.Fragment>
  );
}

export default HomeView;
