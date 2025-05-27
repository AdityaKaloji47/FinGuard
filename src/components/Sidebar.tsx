import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Settings, 
  LogOut,
  PiggyBank, 
  BarChart2, 
  Shield, 
  FileText 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 space-y-1">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/dashboard')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link
            to="/income"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/income')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <TrendingUp className="mr-3 h-5 w-5" />
            Income
          </Link>
          
          <Link
            to="/expenses"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/expenses')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <TrendingDown className="mr-3 h-5 w-5" />
            Expenses
          </Link>
          
          <Link
            to="/savings"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/savings')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <PiggyBank className="mr-3 h-5 w-5" />
            Savings
          </Link>
          
          <Link
            to="/goals"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/goals')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Target className="mr-3 h-5 w-5" />
            Goals
          </Link>
          
          <Link
            to="/investment"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/investment')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Investment
          </Link>
          
          <Link
            to="/insurance"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/insurance')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Shield className="mr-3 h-5 w-5" />
            Insurance
          </Link>
          
          {/* Add Transactions Link */}
          <Link
            to="/transactions"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/transactions')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="mr-3 h-5 w-5" />
            Transactions
          </Link>
          
          <Link
            to="/settings"
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/settings')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;