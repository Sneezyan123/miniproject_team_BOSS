import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import tridentLogo from '../../assets/images/logo.png';

const MainMenu = () => {
  const { isAuthenticated, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/storage', label: 'Склад' },
    { to: '/inventory', label: 'Інвентар' },
    { to: '/requests', label: 'Запити' },
    { to: '/about', label: 'Про застосунок' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20">
          {/* Logo section */}
          <div className="flex items-center flex-1">
            <Link to="/" className="flex items-center gap-4">
              <img src={tridentLogo} alt="Тризуб" className="h-12 w-auto" />
              <span className="text-xl font-semibold text-gray-900">Project Logistics</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-5 py-2 mx-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center justify-end flex-1">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Профіль</span>
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                <Link 
                  to="/login"
                  className="px-6 py-2.5 text-gray-700 hover:text-green-600 transition-colors"
                >
                  Увійти
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Зареєструватися
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
        <div className="px-4 pt-3 pb-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="block px-4 py-3 text-base font-medium text-green-600 hover:bg-green-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Профіль
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Увійти
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 text-base font-medium text-green-600 hover:bg-green-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Зареєструватися
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;