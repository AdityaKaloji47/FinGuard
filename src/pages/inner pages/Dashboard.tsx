import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import MobileSidebar from '../../components/MobileSidebar';
import { Link } from 'react-router-dom';

// Importing gifs
import health from '../../images/dashboard/insurance/health.gif';
import life from '../../images/dashboard/insurance/life.gif';
import car from '../../images/dashboard/insurance/car.gif';
import bike from '../../images/dashboard/insurance/bike.gif';
import home from '../../images/dashboard/insurance/home.gif';
import travel from '../../images/dashboard/insurance/travel.gif';
import more from '../../images/dashboard/investment/more.gif';
import bonds from '../../images/dashboard/investment/bonds.gif';
import sip from '../../images/dashboard/investment/sip.gif';
import stocks from '../../images/dashboard/investment/stocks.gif';
import etfs from '../../images/dashboard/investment/etfs.gif';
import ppf from '../../images/dashboard/investment/ppf.gif';
import fd from '../../images/dashboard/investment/fd.gif';
import commodity from '../../images/dashboard/investment/commodity.gif';
import savings_account from '../../images/dashboard/investment/savings_account.gif';
import ssy from '../../images/dashboard/investment/ssy.gif';
import real_estate from '../../images/dashboard/investment/real_estate.gif';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type Transaction = {
  _id: string;
  amount: number;
  source: string;
  note?: string;
  date: string;
  type: 'income' | 'expense' | 'saving';
  userId: string;
};

type Goal = {
  _id: string;
  name: string;
  amount: number;
  currentAmount: number;
  category: string;
  dueDate: string;
  note?: string;
  userId: string;
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<'monthly' | 'yearly' | 'overall'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<'investment' | 'insurance'>('investment');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch transactions
        const transactionsResponse = await axios.get(`http://localhost:5000/api/transactions?userId=${user._id}`);
        setTransactions(transactionsResponse.data);

        // Fetch goals
        const goalsResponse = await axios.get(`http://localhost:5000/api/goals?userId=${user._id}`);
        setGoals(goalsResponse.data);

        // Calculate totals based on the selected time period
        calculateTotals(transactionsResponse.data);
      } catch (err: any) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const calculateTotals = (transactions: Transaction[]) => {
    const filteredTransactions = filterTransactionsByTimePeriod(transactions);

    const incomeTotal = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expensesTotal = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsTotal = transactions
      .filter((t) => t.type === 'saving')
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalIncome(incomeTotal);
    setTotalExpenses(expensesTotal);
    setTotalSavings(savingsTotal);
  };

  const filterTransactionsByTimePeriod = (transactions: Transaction[]) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    switch (timePeriod) {
      case 'monthly':
        return transactions.filter((t) => {
          const transactionDate = new Date(t.date);
          return (
            transactionDate.getFullYear() === currentYear &&
            transactionDate.getMonth() === currentMonth
          );
        });
      case 'yearly':
        return transactions.filter((t) => {
          const transactionDate = new Date(t.date);
          return transactionDate.getFullYear() === currentYear;
        });
      case 'overall':
        return transactions;
      default:
        return transactions;
    }
  };

  const handleTimePeriodChange = (period: 'monthly' | 'yearly' | 'overall') => {
    setTimePeriod(period);
    calculateTotals(transactions);
  };

  const prepareIncomeExpenseSavingsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    const labels = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12;
      return months[monthIndex];
    });

    const incomeData = labels.map((_, index) => {
      const monthStart = new Date(new Date().getFullYear(), currentMonth - 5 + index, 1).toISOString();
      const monthEnd = new Date(new Date().getFullYear(), currentMonth - 4 + index, 0).toISOString();
      return transactions
        .filter((t) => t.type === 'income' && t.date >= monthStart && t.date <= monthEnd)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    const expenseData = labels.map((_, index) => {
      const monthStart = new Date(new Date().getFullYear(), currentMonth - 5 + index, 1).toISOString();
      const monthEnd = new Date(new Date().getFullYear(), currentMonth - 4 + index, 0).toISOString();
      return transactions
        .filter((t) => t.type === 'expense' && t.date >= monthStart && t.date <= monthEnd)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    const savingsData = labels.map((_, index) => {
      const monthStart = new Date(new Date().getFullYear(), currentMonth - 5 + index, 1).toISOString();
      const monthEnd = new Date(new Date().getFullYear(), currentMonth - 4 + index, 0).toISOString();
      return transactions
        .filter((t) => t.type === 'saving' && t.date >= monthStart && t.date <= monthEnd)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: expenseData,
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1,
        },
        {
          label: 'Savings',
          data: savingsData,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareExpenseCategoryData = () => {
    const filteredTransactions = filterTransactionsByTimePeriod(transactions);

    const categories = Array.from(new Set(filteredTransactions.filter((t) => t.type === 'expense').map((t) => t.source)));
    const amounts = categories.map((category) =>
      filteredTransactions
        .filter((t) => t.type === 'expense' && t.source === category)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareSavingsCategoryData = () => {
    const filteredTransactions = filterTransactionsByTimePeriod(transactions);

    const categories = Array.from(new Set(filteredTransactions.filter((t) => t.type === 'saving').map((t) => t.source)));
    const amounts = categories.map((category) =>
      filteredTransactions
        .filter((t) => t.type === 'saving' && t.source === category)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(34, 197, 94, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
            'rgb(34, 197, 94)',
            'rgb(255, 206, 86)',
            'rgb(255, 159, 64)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareBudgetAllocationData = () => {
    const needs = totalIncome * 0.5;
    const wants = totalIncome * 0.3;
    const savings = totalIncome * 0.2;

    return {
      labels: ['Needs (50%)', 'Wants (30%)', 'Savings (20%)'],
      datasets: [
        {
          data: [needs, wants, savings],
          backgroundColor: [
            'rgba(34, 197, 94, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const remainingBudget = totalIncome - totalExpenses - totalSavings;

  const needsBudget = remainingBudget * 0.5;
  const wantsBudget = remainingBudget * 0.3;
  const savingsBudget = remainingBudget * 0.2;

  const investmentOptions = [
    { name: 'Mutual Fund (SIP)', image: sip, link: 'https://www.sbimf.com' },
    { name: 'Stocks', image: stocks, link: 'https://www.nseindia.com' },
    { name: 'FD', image: fd, link: 'https://www.onlinesbi.com' },
    { name: 'Commodity', image: commodity, link: 'https://rbi.org.in' },
    { name: 'Savings Account', image: savings_account, link: 'https://www.onlinesbi.com' },
  ];

  const remainingInvestmentOptions = [
    { name: 'Bonds', image: bonds, link: 'https://www.rbi.org.in' },
    { name: 'ETFs', image: etfs, link: 'https://mf.nipponindiaim.com' },
    { name: 'Sukanya Samriddhi', image: ssy, link: 'https://www.indiapost.gov.in' },
    { name: 'PPF', image: ppf, link: 'https://www.onlinesbi.com' },
    { name: 'Real Estate', image: real_estate, link: 'https://www.magicbricks.com' },
  ];

  const insuranceOptions = [
    { name: 'Health', image: health, link: 'https://www.starhealth.in/' },
    { name: 'Life', image: life, link: 'https://www.licindia.in/' },
    { name: 'Car', image: car, link: 'https://www.newindia.co.in/' },
    { name: 'Bike', image: bike, link: 'https://www.newindia.co.in/' },
    { name: 'Home', image: home, link: 'https://www.sbigeneral.in/' },
    { name: 'Travel', image: travel, link: 'https://www.hdfcergo.com/' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:hidden mb-4">
          <MobileSidebar />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {user?.username || "User"}! 👋
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Here's a summary of your financial journey.
          </p>
        </div>

        {/* Investment and Insurance Selector */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <button
              onClick={() => setSelectedCategory('investment')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'investment'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Investment
            </button>
            <button
              onClick={() => setSelectedCategory('insurance')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'insurance'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Insurance
            </button>
          </div>
        </div>

        {/* Investment and Insurance Options */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-7 max-w-4xl">
            {selectedCategory === 'investment' ? (
              <>
                {investmentOptions.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex flex-col items-center"
                  >
                    <div className="w-28 h-28 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg font-medium">
                      {item.name}
                    </p>
                  </a>
                ))}
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setShowPopup(true)}
                >
                  <div className="w-28 h-28 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                    <img
                      src={more}
                      alt="More Options"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg font-medium">
                    More Options
                  </p>
                </div>
              </>
            ) : (
              <>
                {insuranceOptions.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex flex-col items-center"
                  >
                    <div className="w-28 h-28 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg font-medium">
                      {item.name}
                    </p>
                  </a>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Popup for More Investment Options */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative w-11/12 max-w-3xl">
              {/* Cross Icon */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Popup Content */}
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">
                More Investment Options
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {remainingInvestmentOptions.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex flex-col items-center hover:scale-105 transform transition-transform duration-200"
                  >
                    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 font-medium">
                      {item.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md mb-6">
            <p className="text-red-700 dark:text-red-100">{error}</p>
          </div>
        ) : (
          <>
            {/* Budget Summary with Time Period Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              {/* Time Period Selector */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Budget Summary</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTimePeriodChange('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      timePeriod === 'monthly'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => handleTimePeriodChange('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      timePeriod === 'yearly'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Yearly
                  </button>
                  <button
                    onClick={() => handleTimePeriodChange('overall')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      timePeriod === 'overall'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Overall
                  </button>
                </div>
              </div>

              {/* Budget Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Income</h2>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹ {totalIncome.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Expenses</h2>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">₹ {totalExpenses.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Savings</h2>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹ {totalSavings.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Remaining Budget</h2>
                  <p className={`text-3xl font-bold ${
                    remainingBudget >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    ₹ {remainingBudget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Allocation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Budget Allocation (50-30-20 Rule)</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Needs (50%)</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹ {needsBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Housing, utilities, groceries, etc.</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Wants (30%)</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹ {wantsBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Entertainment, dining out, shopping, etc.</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Savings (20%)</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹ {savingsBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Emergency fund, investments, goals, etc.</p>
                </div>
              </div>

              <div className="h-64">
                <Doughnut
                  data={prepareBudgetAllocationData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Income vs Expenses vs Savings</h2>
                <div className="h-64">
                  <Bar
                    data={prepareIncomeExpenseSavingsData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                          }
                        },
                        x: {
                          ticks: {
                            color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                 <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Expense Categories</h2>
                 <div className="h-64">
                   <Doughnut
                    data={prepareExpenseCategoryData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Savings Categories</h2>
                <div className="h-64">
                  <Doughnut
                    data={prepareSavingsCategoryData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Transactions</h2>

              {transactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Source
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filterTransactionsByTimePeriod(transactions)
                        .slice(0, 10)
                        .map((transaction) => (
                          <tr key={transaction._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {formatDate(transaction.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.type === 'income' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : transaction.type === 'expense'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              }`}>
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {transaction.source}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                              transaction.type === 'income' 
                                ? 'text-green-600 dark:text-green-400' 
                                : transaction.type === 'expense'
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}₹ {transaction.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Goals Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Goals Progress</h2>

              {goals.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No goals found. Set a goal to start tracking your progress.</p>
              ) : (
                <div className="space-y-6">
                  {goals.map((goal) => {
                    const progress = (goal.currentAmount / goal.amount) * 100;

                    return (
                      <Link
                        to="/goals"
                        key={goal._id}
                        className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">{goal.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {goal.category} • Due by {formatDate(goal.dueDate)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-md font-medium text-gray-900 dark:text-white">
                            ₹ {goal.currentAmount.toLocaleString()} / ₹ {goal.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {progress.toFixed(1)}% complete
                            </p>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;