import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const getClasses = ({ isActive }: any) =>
    [styles.link, isActive ? styles.active : ''].join(' ');

  return (
    <nav className={styles.main}>
      <NavLink to="/" className={getClasses}>
        My Spells
      </NavLink>
      <NavLink to="/search" className={getClasses}>
        Search
      </NavLink>
    </nav>
  );
};

export default Navigation;
