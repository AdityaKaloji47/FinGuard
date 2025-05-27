import React from 'react';
import { Shield, TrendingUp, Target, PieChart } from 'lucide-react';
import vaibhavi from '../../images/about images/vaibhavi.jpg';
import aditya from '../../images/about images/aditya.jpg';
import narendra from '../../images/about images/Narendra.jpg';
import vishal from '../../images/about images/vishal.jpg';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-green-600 dark:bg-green-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              About FINGUARD
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Your trusted partner for financial planning and budget management
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 dark:text-green-400 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Empowering Financial Freedom
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              At FINGUARD, we believe everyone deserves financial security and the knowledge to make informed decisions about their money. Our mission is to provide accessible, easy-to-use tools that help people take control of their finances.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Financial Security */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Financial Security</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    We help you build a strong financial foundation through smart budgeting and planning.
                  </p>
                </div>
              </div>

              {/* Growth Mindset */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Growth Mindset</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    We encourage continuous improvement in financial habits and knowledge.
                  </p>
                </div>
              </div>

              {/* Goal Achievement */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Goal Achievement</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    We provide the tools and guidance to help you reach your financial goals.
                  </p>
                </div>
              </div>

              {/* Data-Driven Insights */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <PieChart className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Data-Driven Insights</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    We transform your financial data into actionable insights for better decision-making.
                  </p>
                </div>
              </div>

              {/* Investment */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Investment</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Explore investment opportunities to grow your wealth over time.
                  </p>
                </div>
              </div>

              {/* Insurance */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Insurance</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Protect your financial future with the right insurance plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 50-30-20 Rule Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 dark:text-green-400 font-semibold tracking-wide uppercase">Our Approach</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              The 50-30-20 Rule
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* 50% - Needs */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-600 px-4 py-2">
                <h3 className="text-lg font-medium text-white">50% - Needs</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 dark:text-gray-300">
                  Allocate 50% of your income to essential expenses such as:
                </p>
                <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-300">
                  <li>Housing (rent or mortgage)</li>
                  <li>Utilities</li>
                  <li>Groceries</li>
                  <li>Transportation</li>
                  <li>Insurance</li>
                </ul>
              </div>
            </div>

            {/* 30% - Wants */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-600 px-4 py-2">
                <h3 className="text-lg font-medium text-white">30% - Wants</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 dark:text-gray-300">
                  Allocate 30% of your income to non-essential expenses such as:
                </p>
                <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-300">
                  <li>Dining out</li>
                  <li>Entertainment</li>
                  <li>Shopping</li>
                  <li>Subscriptions</li>
                  <li>Hobbies</li>
                </ul>
              </div>
            </div>

            {/* 20% - Savings */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-600 px-4 py-2">
                <h3 className="text-lg font-medium text-white">20% - Savings</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 dark:text-gray-300">
                  Allocate 20% of your income to savings and investments such as:
                </p>
                <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-300">
                  <li>Emergency fund</li>
                  <li>Retirement accounts</li>
                  <li>Debt repayment</li>
                  <li>Investments (stocks, bonds, etc.)</li>
                  <li>Specific financial goals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 dark:text-green-400 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              At Your Service
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Our team works together to provide you with the best financial planning tools.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Vaibhavi Girkar */}
            <div className="text-center bg-white dark:bg-gray-700 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img className="mx-auto h-48 w-48 rounded-full mt-8 border-4 border-green-600" src={vaibhavi} alt="Vaibhavi Girkar" />
              <div className="mt-6 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Vaibhavi Girkar</h3>
                <p className="text-sm text-green-600 dark:text-green-400">UI/UX & Frontend Developer</p>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  Pursuing a degree in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning.
                </p>
              </div>
            </div>

            {/* Aditya Kaloji */}
            <div className="text-center bg-white dark:bg-gray-700 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img className="mx-auto h-48 w-48 rounded-full mt-8 border-4 border-green-600" src={aditya} alt="Aditya Kaloji" />
              <div className="mt-6 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Aditya Kaloji</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Database & Backend Developer</p>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  Pursuing a degree in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning.
                </p>
              </div>
            </div>

            {/* Narendra Gurav */}
            <div className="text-center bg-white dark:bg-gray-700 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img className="mx-auto h-48 w-48 rounded-full mt-8 border-4 border-green-600" src={narendra} alt="Narendra Gurav" />
              <div className="mt-6 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Narendra Gurav</h3>
                <p className="text-sm text-green-600 dark:text-green-400">UI/UX & Frontend Developer</p>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  Pursuing a degree in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning.
                </p>
              </div>
            </div>

            {/* Vishal Khanvilkar */}
            <div className="text-center bg-white dark:bg-gray-700 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img className="mx-auto h-48 w-48 rounded-full mt-8 border-4 border-green-600" src={vishal} alt="Vishal Khanvilkar" />
              <div className="mt-6 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Vishal Khanvilkar</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Backend Developer</p>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  Pursuing a degree in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;