import React from 'react';

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


interface GoalPlanPopupProps {
  goal: Goal;
  onClose: () => void;
}

const GoalPlanPopup: React.FC<GoalPlanPopupProps> = ({ goal, onClose }) => {
  const { name, amount, currentAmount, dueDate, category, note } = goal;

  const now = new Date();
  const goalDate = new Date(dueDate);
  const monthsRemaining = Math.max(0, (goalDate.getFullYear() - now.getFullYear()) * 12 + (goalDate.getMonth() - now.getMonth()));

  const recommendedMonthlyContribution = amount / monthsRemaining;

  const progressPercentage = (currentAmount / amount) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Category: {category}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Target Amount: ₹{amount.toLocaleString()}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Current Amount: ₹{currentAmount.toLocaleString()}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Due Date: {new Date(dueDate).toLocaleDateString()}</p>
        {note && <p className="text-gray-600 dark:text-gray-300 mb-4">Note: {note}</p>}

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Recommendation Plan</h3>

          <p className="text-gray-600 dark:text-gray-300">
            Your target amount is ₹{amount.toLocaleString()} with a due date of {new Date(dueDate).toLocaleDateString()}.
            To achieve this goal, you should contribute approximately ₹{recommendedMonthlyContribution.toFixed(2)} per month.
          </p>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            So far, you have contributed ₹{currentAmount.toLocaleString()}, which is {progressPercentage.toFixed(1)}% of your goal.
            The remaining amount is ₹{(amount - currentAmount).toLocaleString()}, and you have {monthsRemaining} months left.
            To stay on track, you should contribute approximately ₹{((amount - currentAmount) / monthsRemaining).toFixed(2)} per month.
          </p>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Keep up the good work! You're making progress toward your goal.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            {progressPercentage.toFixed(1)}% Completed
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GoalPlanPopup;