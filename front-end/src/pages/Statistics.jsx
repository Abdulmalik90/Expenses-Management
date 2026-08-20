import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Briefcase, Home, Wifi, Wallet } from 'lucide-react';

// --- بيانات وهمية (Mock Data) ---
const categoriesData = [
    { id: 1, name: 'Salary', amount: '+ $3,000', color: 'bg-blue-500', isIncome: true },
    { id: 2, name: 'Food', amount: '- $500', color: 'bg-red-500', isIncome: false },
    { id: 3, name: 'Rent', amount: '- $1,200', color: 'bg-blue-900', isIncome: false },
    { id: 4, name: 'Internet', amount: '- $120', color: 'bg-green-600', isIncome: false },
    { id: 5, name: 'Misc', amount: '- $180', color: 'bg-blue-200', isIncome: false },
    ];

    const recentTransactions = [
    { id: 1, title: 'Salary', subtitle: 'Monthly Income', desc: 'Direct deposit from Corp Inc.', amount: '+ $990.00', date: '10:30 AM', icon: Wallet, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-500' },
    { id: 2, title: 'Business', subtitle: 'Freelance', desc: 'Design consultation fee.', amount: '+ $1000.00', date: 'Yesterday', icon: Briefcase, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-500' },
    { id: 3, title: 'Rent', subtitle: 'Housing', desc: 'Monthly apartment rent.', amount: '- $200.00', date: 'Oct 1', icon: Home, color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-800', border: 'border-gray-800 dark:border-gray-600' },
    { id: 4, title: 'Internet', subtitle: 'Utilities', desc: 'Fiber optic monthly bill.', amount: '- $120.00', date: 'Oct 5', icon: Wifi, color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-800', border: 'border-gray-800 dark:border-gray-600' },
    ];

    const Statistics = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All'); // 'All' | 'Income' | 'Outcomes'
    const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'highest'

    // --- المنطق الهندسي للتبويبات والترتيب ---
    const processedTransactions = recentTransactions
        // 1. فلترة التبويبات (All, Income, Outcomes)
        .filter((tx) => {
            if (filter === 'Income') return tx.amount.includes('+');
            if (filter === 'Outcomes') return tx.amount.includes('-');
        return true; })
            // 2. تطبيق الترتيب (Filter)
        .sort((a, b) => {
            // تحويل النص (مثال: "+ $990.00") إلى رقم حقيقي للتمكن من مقارنته
            const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
            const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
            
            if (sortBy === 'highest') return Math.abs(amountB) - Math.abs(amountA);
            return b.id - a.id; // 'recent'
        });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full animate-fade-in">
        
        {/* --- الترويسة وأزرار الفلترة --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{t('Statistics')}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('Overview of your financial activity')}</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
            {/* أزرار نوع العملية */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full md:w-auto">
                {['All', 'Income', 'Outcomes'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === f ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    {t(f)}
                </button>
                ))}
            </div>
            
            {/* زر الفلتر الإضافي */}
            <div className="relative hidden sm:flex items-center">
                <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ltr:pl-4 rtl:pr-4 ltr:pr-8 rtl:pl-8 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors outline-none cursor-pointer"
                >
                    <option value="recent">{t('Recent')}</option>
                    <option value="highest">{t('Highest Amount')}</option>
                </select>
                <div className="absolute inset-y-0 ltr:right-2 rtl:left-2 flex items-center pointer-events-none text-gray-400">
                    <Filter size={14} />
                </div>
            </div>
            </div>
        </div>

        {/* --- القسم العلوي: التصنيفات والرسم البياني --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* 1. قائمة التصنيفات */}
            <div className="lg:col-span-4 bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('Categories')}</h2>
            <div className="space-y-4">
                {categoriesData.map((cat) => (
                <div key={cat.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{t(cat.name)}</span>
                    </div>
                    <span className={`font-semibold ${cat.isIncome ? 'text-green-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {cat.amount}
                    </span>
                </div>
                ))}
            </div>
            </div>

            {/* 2. الرسم البياني (Donut Chart) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center min-h-[300px]">
            <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* 
                استخدام CSS Conic Gradient لإنشاء الرسم الدائري بدون مكتبات خارجية!
                هذه التقنية ترسم دائرة ملونة مقسمة حسب النسب المئوية.
                */}
                <div 
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'conic-gradient(#3B82F6 0% 40%, #1E3A8A 40% 65%, #EF4444 65% 85%, #16A34A 85% 95%, #BFDBFE 95% 100%)'
                }}
                ></div>

                {/* الدائرة الداخلية لعمل ثقب الدونات */}
                <div className="absolute inset-4 bg-white dark:bg-[#0F172A] rounded-full flex flex-col items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-widest uppercase mb-1">{t('Total Balance')}</span>
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$5,000</span>
                </div>
                
            </div>
            </div>
        </div>

        {/* --- القسم السفلي: آخر العمليات --- */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('Recent Transactions')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            { processedTransactions.length > 0 ? (
            processedTransactions.map((tx) => {
                const Icon = tx.icon;
                return (
                <div key={tx.id} className={`flex flex-col bg-white dark:bg-[#0F172A] rounded-2xl border ltr:border-l-4 rtl:border-r-4 border-y border-x ${tx.border} dark:border-y-gray-800 dark:border-x-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow`}>
                    
                    <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.bg} ${tx.color}`}>
                        <Icon size={24} />
                        </div>
                        <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{t(tx.title)}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t(tx.subtitle)}</p>
                        </div>
                    </div>
                    <span className={`text-xl font-bold ${tx.amount.includes('+') ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                        {tx.amount}
                    </span>
                    </div>

                    <div className="flex justify-between items-end mt-auto">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t(tx.desc)}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">{t(tx.date)}</p>
                    </div>
                </div>
                );
            })): (
                <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                {t('No transactions found for this filter.')}
                </div>
            )}
            </div>
        </div>

        </div>
    );
};

export default Statistics;