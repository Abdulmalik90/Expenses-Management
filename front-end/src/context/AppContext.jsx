import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const [lang, setLang] = useState('en'); // 'en' or 'ar'

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

    // قاموس بسيط للترجمة
    const t = {
        en: { addExpense: '+ Expense', search: 'Search expenses...', deleteAlert: 'Are you sure you want to delete this?' },
        ar: { addExpense: '+ مصروف', search: 'ابحث عن المصاريف...', deleteAlert: 'هل أنت متأكد من حذف هذا المصروف؟' }
    };

    return (
        <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t: t[lang] }}>
            <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}>
                {children}
            </div>
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);