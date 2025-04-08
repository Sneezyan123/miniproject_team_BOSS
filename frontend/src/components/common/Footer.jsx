import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/storage">Склад</Link>
          <Link to="/support">Технічна підтримка</Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} App name</p>
      </div>
    </footer>
  );
};

export default Footer;