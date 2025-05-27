import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, PieChart, Wallet, Target, TrendingUp, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-800 dark:bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Take Control of Your Finances with FINGUARD
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl">
              Track your income, manage expenses, and achieve your financial goals with our comprehensive budgeting tool.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
              >
                Learn More
              </Link>
              <button
                onClick={() => {
                  const buttons = document.querySelectorAll('button');
                  buttons.forEach(button => {
                    if (button.innerText === 'Create Account') {
                      button.click();
                    }
                  });
                }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-900"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Smart Financial Planning
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              FINGUARD helps you manage your money effectively with powerful tools and insights.
            </p>
          </div>

          {/* Scrolling Features */}
          <div className="mt-16 overflow-hidden">
            <div className="flex animate-scroll">
              {/* Original Content */}
              {renderFeatureSection('Budget Management', Wallet, 'Track your income and expenses to understand where your money goes.')}
              {renderFeatureSection('Financial Analysis', LineChart, 'Visualize your financial data with intuitive charts and graphs.')}
              {renderFeatureSection('50-30-20 Rule', PieChart, 'Optimize your budget with the proven 50-30-20 rule for financial success.')}
              {renderFeatureSection('Goal Setting', Target, 'Set financial goals and track your progress with personalized plans.')}
              {renderFeatureSection('Investment', TrendingUp, 'Explore investment opportunities to grow your wealth over time.')}
              {renderFeatureSection('Insurance', Shield, 'Protect your financial future with the right insurance plans.')}

              {/* Duplicated Content for Seamless Looping */}
              {renderFeatureSection('Budget Management', Wallet, 'Track your income and expenses to understand where your money goes.')}
              {renderFeatureSection('Financial Analysis', LineChart, 'Visualize your financial data with intuitive charts and graphs.')}
              {renderFeatureSection('50-30-20 Rule', PieChart, 'Optimize your budget with the proven 50-30-20 rule for financial success.')}
              {renderFeatureSection('Goal Setting', Target, 'Set financial goals and track your progress with personalized plans.')}
              {renderFeatureSection('Investment', TrendingUp, 'Explore investment opportunities to grow your wealth over time.')}
              {renderFeatureSection('Insurance', Shield, 'Protect your financial future with the right insurance plans.')}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-800 dark:bg-green-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to take control?</span>
            <span className="block text-green-200">Start your financial journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => {
                  const buttons = document.querySelectorAll('button');
                  buttons.forEach(button => {
                    if (button.innerText === 'Create Account') {
                      button.click();
                    }
                  });
                }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render feature sections
const renderFeatureSection = (title: string, Icon: React.ElementType, description: string) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md min-w-[300px] mx-4">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

export default Home;