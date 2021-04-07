import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const HomeView = () => {
  const backendHealth = useSelector(state => state.app.health);

  return (
    <React.Fragment>
      <h1>Witaj w inwentaryzatorze</h1>
      <p>jakaś pomoc tutaj</p>
      {backendHealth && <p style={{color: 'red'}}>backend is up heheheheh</p>}
      {!backendHealth && <p>zxckzljxclkzjxc</p>}
    </React.Fragment>
  );
}

export default HomeView;
