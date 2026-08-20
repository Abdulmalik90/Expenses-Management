// src/components/ExpenseCard.jsx
import React from 'react';

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
    const isIncome = expense.amount > 0;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative group">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {isIncome ? '+' : '-'}
            </div>
            <h3 className="text-xl font-semibold dark:text-white">{expense.category}</h3>
            </div>
            <span className={`text-2xl font-bold ${isIncome ? 'text-green-500' : 'text-white dark:text-gray-200'}`}>
            {isIncome ? '+' : '-'}${Math.abs(expense.amount)}
            </span>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{expense.details}</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">{expense.date}</p>
        </div>

        {/* أزرار التعديل والحذف (تظهر عند تمرير الماوس) */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button onClick={() => onEdit(expense)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
            Edit
            </button>
            <button onClick={() => onDelete(expense)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
            Delete
            </button>
        </div>
        </div>
    );
};

export default ExpenseCard;