// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">SYSTEM</div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/lista" className="navbar-link">Lista</Link>
        <Link to="/cadastro" className="navbar-link">Cadastro</Link>
      </div>
    </nav>
  );
};

export default Navbar;
