import React from 'react';
import { useSelector } from 'react-redux';

export const HomeView = () => {
  const backendHealth = useSelector(state => state.app.health);

  return (
    <React.Fragment>
      <h1>Inwentaryzator</h1>
      {backendHealth && <p style={{color: 'red'}}>backend is up heheheheh</p>}
      {!backendHealth && <p>zxckzljxclkzjxc</p>}
    </React.Fragment>
  );
}

export default HomeView;
