// src/components/ExpenseModal.jsx
import React, { useState, useEffect } from 'react';

const ExpenseModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({ amount: '', category: '', details: '' });

    // تعبئة البيانات إذا كنا في حالة "تعديل"
    useEffect(() => {
        if (initialData) setFormData(initialData);
        else setFormData({ amount: '', category: '', details: '' });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // سيتم ربط هذه الدالة لاحقاً بـ Backend
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-96">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                {initialData ? 'Edit Expense' : 'Add Expense'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.amount} 
                        onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                    />
                    <input 
                        type="text" 
                        placeholder="Category (e.g. Salary, Rent)" 
                        className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    />
                    <textarea 
                        placeholder="Details" 
                        className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.details} 
                        onChange={(e) => setFormData({...formData, details: e.target.value})} 
                    />
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseModal;