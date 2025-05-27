import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import MobileSidebar from '../../components/MobileSidebar';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); 
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:hidden mb-4">
          <MobileSidebar />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account</h2>
            
            <div className="space-y-4">
              <Link
                to="/profile"
                className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Profile Settings</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Update your personal information and profile photo
                  </p>
                </div>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Logout</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sign out of your account
                  </p>
                </div>
              </button>
            </div>
          </div>
          
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Toggle between light and dark theme
                    </p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={toggleTheme}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;