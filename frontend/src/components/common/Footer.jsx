import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/storage">Склад</Link>
          <Link to="/about">Технічна підтримка</Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Забезпечено</p>
      </div>
    </footer>
  );
};

export default Footer;