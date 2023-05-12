import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Home</h1>
      <p>Projects to see:</p>
      <Link to="/page-one">
        <h4>Todo-List</h4>
      </Link>
      <Link to="/page-two">
        <h4>Expense Calculator</h4>
      </Link>
    </div>
  );
};

export default Home;
