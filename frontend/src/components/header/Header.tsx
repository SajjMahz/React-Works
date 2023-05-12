import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          navbar
        </Link>
        <nav className={classes.header__content__nav}>
          <ul>
            <li>
              <Link to="/page-one">PageOne</Link>
            </li>
            <li>
              <Link to="/page-two">PageTwo</Link>
            </li>
            <li>
              <Link to="/page-three">PageThree</Link>
            </li>
          </ul>
          <button
            onClick={() => {
              navigate('/page-cta');
            }}
          >
            CTA Page
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
