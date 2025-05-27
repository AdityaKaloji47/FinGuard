import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import logo from '../images/fin.png';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-600 dark:bg-green-800 text-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              {/* Temporary Logo Image */}
              <img
                src= {logo}
                alt="FINGUARD Logo"
                className="h-12 w-10 mr-5" // Adjust size and spacing
              />
              <span className="text-4xl font-bold tracking-wide">FINGUARD</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={user ? '/dashboard' : '/'}
              className="px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
            >
              {user ? 'Dashboard' : 'Home'}
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
            >
              Contact
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* User Profile or Auth Buttons */}
            {user ? (
              <Link to="/profile" className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-800 dark:bg-green-600 flex items-center justify-center hover:bg-green-700 dark:hover:bg-green-900 transition-colors">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <User size={24} />
                  )}
                </div>
              </Link>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 rounded-md bg-white text-green-600 hover:bg-gray-100 text-lg font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-6 py-2 rounded-md bg-green-800 hover:bg-green-900 text-white text-lg font-medium transition-colors"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-600 dark:bg-green-800 border-t-2 border-green-700 dark:border-green-900">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link
              to={user ? '/dashboard' : '/'}
              className="block px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {user ? 'Dashboard' : 'Home'}
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Dark Mode Toggle in Mobile Menu */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="flex w-full px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
              <span className="ml-2">
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </span>
            </button>

            {/* User Profile or Auth Buttons in Mobile Menu */}
            {user ? (
              <Link
                to="/profile"
                className="block px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowRegisterModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium hover:bg-green-700 dark:hover:bg-green-900 transition-colors"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onRegisterClick={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onLoginClick={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;