import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { PlusCircle, Target, TrendingUp, Trash, Eye, Edit } from 'lucide-react';
import MobileSidebar from '../../components/MobileSidebar';
import GoalPlanPopup from '../../components/GoalPlanPopup';

// Types
type Goal = {
  _id: string;
  name: string;
  amount: number;
  currentAmount: number;
  category: string;
  dueDate: string;
  note?: string;
  userId: string;
  createdAt?: string;
};

type FinancialSummary = {
  incomeTotal: number;
  expensesTotal: number;
  savingsTotal: number;
  remainingBudget: number;
};

// API Service
const goalService = {
  fetchGoals: async (userId: string) => {
    const response = await axios.get(`http://localhost:5000/api/goals?userId=${userId}`);
    return response.data;
  },
  fetchTransactions: async (userId: string) => {
    const response = await axios.get(`http://localhost:5000/api/transactions?userId=${userId}`);
    return response.data;
  },
  createGoal: async (goalData: Omit<Goal, '_id' | 'currentAmount'>) => {
    const response = await axios.post('http://localhost:5000/api/goals', goalData);
    return response.data;
  },
  updateGoal: async (goalId: string, goalData: Partial<Goal>) => {
    const response = await axios.put(`http://localhost:5000/api/goals/${goalId}`, {
      ...goalData,
      userId: goalData.userId // Make sure userId is included
    });
    return response.data;
  },
  deleteGoal: async (goalId: string) => {
    await axios.delete(`http://localhost:5000/api/goals/${goalId}`);
  },
  contributeToGoal: async (goalId: string, amount: number) => {
    await axios.put(`http://localhost:5000/api/goals/${goalId}/contribute`, { amount });
  },
  createTransaction: async (transactionData: {
    amount: number;
    source: string;
    type: string;
    userId: string;
  }) => {
    await axios.post('http://localhost:5000/api/transactions', transactionData);
  }
};

// Utility functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const calculateTimeRemaining = (dueDate: string) => {
  const now = new Date();
  const goalDate = new Date(dueDate);
  const diffTime = goalDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return '1 day remaining';
  if (diffDays < 30) return `${diffDays} days remaining`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} remaining`;
  }
  
  const years = Math.floor(diffDays / 365);
  const remainingMonths = Math.floor((diffDays % 365) / 30);
  return `${years} ${years === 1 ? 'year' : 'years'}${remainingMonths > 0 ? ` and ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}` : ''} remaining`;
};

const calculateFinancialSummary = (transactions: any[]): FinancialSummary => {
  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesTotal = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsTotal = transactions
    .filter(t => t.type === 'saving')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    incomeTotal,
    expensesTotal,
    savingsTotal,
    remainingBudget: incomeTotal - expensesTotal - savingsTotal
  };
};

const Goals: React.FC = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    incomeTotal: 0,
    expensesTotal: 0,
    savingsTotal: 0,
    remainingBudget: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    dueDate: '',
    note: ''
  });
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const [goalsData, transactionsData] = await Promise.all([
        goalService.fetchGoals(user._id),
        goalService.fetchTransactions(user._id)
      ]);

      setGoals(goalsData);
      setFinancialSummary(calculateFinancialSummary(transactionsData));
    } catch (err) {
      setError('Failed to load data. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewPlan = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleClosePopup = () => {
    setSelectedGoal(null);
  };

  const handleEditGoal = (goal: Goal) => {
    setIsEditing(true);
    setFormData({
      name: goal.name,
      amount: goal.amount.toString(),
      category: goal.category,
      dueDate: new Date(goal.dueDate).toISOString().split('T')[0],
      note: goal.note || ''
    });
    setSelectedGoal(goal);
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      dueDate: '',
      note: ''
    });
    setShowForm(false);
    setIsEditing(false);
    setSelectedGoal(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user) {
      setError('User not authenticated');
      return;
    }
  
    // Validate form
    if (!formData.name || !formData.amount || !formData.category || !formData.dueDate) {
      setError('Please fill in all required fields');
      return;
    }
  
    const amountValue = parseFloat(formData.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Amount must be a valid number greater than 0');
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      // Format the data exactly as expected by the backend
      const goalData = {
        name: formData.name.trim(),
        amount: amountValue,
        currentAmount: isEditing && selectedGoal ? selectedGoal.currentAmount : 0,
        category: formData.category,
        dueDate: new Date(formData.dueDate).toISOString(), // Ensure proper date format
        note: formData.note?.trim() || undefined,
        userId: user._id
      };
  
      if (isEditing && selectedGoal) {
        // For updates, include all required fields
        await axios.put(`http://localhost:5000/api/goals/${selectedGoal._id}`, goalData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSuccess('Goal updated successfully!');
      } else {
        // For new goals
        await axios.post('http://localhost:5000/api/goals', goalData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSuccess('Goal added successfully!');
      }
  
      resetForm();
      await fetchData(); // Refresh the goals list
  
      setTimeout(() => setSuccess(null), 2000);
    } catch (err: any) {
      console.error('Goal submission error:', err);
      
      // Enhanced error handling
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          (isEditing ? 'Failed to update goal' : 'Failed to add goal');
      
      setError(errorMessage);
      
      // Specific handling for 404 errors
      if (err.response?.status === 404) {
        setError('Goal not found. Please refresh and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContribute = async (goalId: string, contributionAmount: number) => {
    if (!user) return;

    if (contributionAmount <= 0) {
      setError('Contribution amount must be greater than 0');
      return;
    }

    if (contributionAmount > financialSummary.remainingBudget) {
      setError(`You can only contribute up to ₹${financialSummary.remainingBudget.toFixed(2)}.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await Promise.all([
        goalService.contributeToGoal(goalId, contributionAmount),
        goalService.createTransaction({
          amount: contributionAmount,
          source: 'Goal Contribution',
          type: 'saving',
          userId: user._id
        })
      ]);

      setSuccess('Contribution added successfully!');
      await fetchData();

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add contribution');
      console.error('Contribution error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!user) return;

    if (!window.confirm('Are you sure you want to delete this goal?')) return;

    try {
      setLoading(true);
      setError(null);

      await goalService.deleteGoal(goalId);
      setSuccess('Goal deleted successfully!');
      await fetchData();

      setTimeout(() => setSuccess(null), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete goal');
      console.error('Delete goal error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:hidden mb-4">
          <MobileSidebar />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Goals</h1>

          <button
            onClick={() => {
              setShowForm(!showForm);
              if (isEditing) resetForm();
            }}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            aria-label={showForm ? 'Cancel adding new goal' : 'Add new goal'}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            {showForm ? 'Cancel' : 'Set New Goal'}
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right font-bold"
              aria-label="Dismiss error message"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
            {success}
            <button 
              onClick={() => setSuccess(null)}
              className="float-right font-bold"
              aria-label="Dismiss success message"
            >
              ×
            </button>
          </div>
        )}

        {/* Goal Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {isEditing ? 'Edit Goal' : 'Set a New Goal'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Goal Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., New Car, Emergency Fund"
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Amount*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">₹</span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleFormChange}
                      min="0"
                      step="0.01"
                      className="pl-7 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Savings">Savings</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Home">Home</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Date*
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleFormChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Note (Optional)
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Add any additional details about this goal"
                    maxLength={500}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors duration-200"
                  aria-label={isEditing ? 'Update goal' : 'Save goal'}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Target className="mr-2 h-5 w-5" />
                      {isEditing ? 'Update Goal' : 'Set Goal'}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Goals List */}
        {loading && !showForm ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <Target className="h-12 w-12 text-green-600 dark:text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Goals Set Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Set your first financial goal to start tracking your progress and get personalized plans to achieve it.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Set Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {goals.map((goal) => {
              const progress = Math.min(100, (goal.currentAmount / goal.amount) * 100);
              const isGoalReached = goal.currentAmount >= goal.amount;

              return (
                <div key={goal._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{goal.name}</h3>
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {goal.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Due by {formatDate(goal.dueDate)} • {calculateTimeRemaining(goal.dueDate)}
                      </p>
                      {goal.note && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {goal.note}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹ {goal.currentAmount.toLocaleString()} <span className="text-sm text-gray-500 dark:text-gray-400">/ ₹ {goal.amount.toLocaleString()}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {progress.toFixed(1)}% complete
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                    <div
                      className={`h-2.5 rounded-full ${isGoalReached ? 'bg-green-500' : 'bg-green-600'}`}
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>

                  {isGoalReached ? (
                    <div className="mt-6 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md text-center">
                      🎉 Congratulations! You've reached your goal!
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0 sm:space-x-3">
                      <div className="w-full sm:w-auto flex items-center space-x-2">
                        <div className="relative flex-grow">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400">₹</span>
                          </div>
                          <input
                            type="number"
                            id={`contribute-${goal._id}`}
                            min="0"
                            step="0.01"
                            max={financialSummary.remainingBudget}
                            placeholder={`Max: ₹${financialSummary.remainingBudget.toFixed(2)}`}
                            className="pl-7 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                            disabled={isGoalReached}
                            aria-label={`Contribution amount for ${goal.name}`}
                          />
                        </div>

                        <button
                          onClick={() => {
                            const input = document.getElementById(`contribute-${goal._id}`) as HTMLInputElement;
                            if (input && input.value) {
                              const contributionAmount = parseFloat(input.value);
                              handleContribute(goal._id, contributionAmount);
                              input.value = '';
                            }
                          }}
                          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                          disabled={isGoalReached}
                        >
                          <TrendingUp className="mr-2 h-5 w-5" />
                          Add
                        </button>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditGoal(goal)}
                          className="flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-700 dark:text-yellow-100 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                          aria-label={`Edit ${goal.name}`}
                        >
                          <Edit className="mr-2 h-5 w-5" />
                          Edit Goal
                        </button>

                        <button
                          onClick={() => handleViewPlan(goal)}
                          className="flex items-center justify-center bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-100 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                          aria-label={`View plan for ${goal.name}`}
                        >
                          <Eye className="mr-2 h-5 w-5" />
                          View Plan
                        </button>

                        <button
                          onClick={() => handleDeleteGoal(goal._id)}
                          className="flex items-center justify-center bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-100 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                          aria-label={`Delete ${goal.name}`}
                        >
                          <Trash className="mr-2 h-5 w-5" />
                          Cancel Goal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Goal Plan Popup */}
        {selectedGoal && !isEditing && (
          <GoalPlanPopup
            goal={{
              ...selectedGoal,
              createdAt: selectedGoal.createdAt || new Date().toISOString(),
            }}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default Goals;