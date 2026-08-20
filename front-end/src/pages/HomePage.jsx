import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, LineChart, RefreshCcw, LogIn } from 'lucide-react';

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center w-full animate-fade-in overflow-hidden">
        
        {/* القسم العلوي (Hero Section) */}
        {/* استخدمنا flex-col-reverse لكي يظهر النص فوق الرسم البياني في الموبايل */}
        <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col-reverse md:flex-row m-10px items-center justify-between gap-12 md:gap-16">
            
            {/* اليمين: النصوص وأزرار البدء (في الشاشات الصغيرة تظهر بالأعلى) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-start z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                    <span className="text-blue-600">{t("Expenses_Hero")}</span><br />{t("Manager_Hero")}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 max-w-md">
                    {t('Hero_p')}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto">
                    <Link 
                    to="/auth" 
                    className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-lg shadow-blue-500/30"
                    >
                    {t('Get Started')}
                    </Link>
                    <Link 
                    to="/auth" 
                    className="w-full sm:w-auto text-center flex justify-center items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium py-3 px-8 rounded-full transition-colors"
                    >
                    <LogIn size={18} />
                    {t('Sign In')}
                    </Link>
                </div>
            </div>

            {/* اليسار: الرسم البياني (تم تصغيره في الموبايل وضبط المؤشرات) */}
            <div className="w-full md:w-1/2 flex justify-center relative mt-8 md:mt-0">
            <div className="relative w-56 h-56 md:w-80 md:h-80 flex items-center justify-center rounded-full border-[12px] md:border-[16px] border-blue-600 border-r-blue-300 border-b-red-400 border-l-[#1E293B] shadow-2xl dark:shadow-none">
                
                <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-1">
                    {t('Total Balance')}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">$5,000</h3>
                </div>
                
                {/* 
                ملاحظة هندسية: استخدمنا ltr و rtl لضمان عدم خروج المؤشرات عن الشاشة في اللغتين 
                */}
                <div className="absolute -top-4 ltr:-right-4 rtl:-left-4 md:ltr:-right-8 md:rtl:-left-8 bg-white dark:bg-gray-800 px-2 py-1 md:px-3 md:py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 text-[10px] md:text-xs font-semibold text-green-500 whitespace-nowrap">
                {t('Salary')} +$2050
                </div>
                <div className="absolute -bottom-6 ltr:-right-2 rtl:-left-2 md:ltr:-right-4 md:rtl:-left-4 bg-white dark:bg-gray-800 px-2 py-1 md:px-3 md:py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 text-[10px] md:text-xs font-semibold text-red-500 whitespace-nowrap">
                {t('Rent')} -$1200
                </div>
                <div className="absolute -top-6 ltr:-left-4 rtl:-right-4 md:-top-8 md:ltr:-left-4 md:rtl:-right-4 bg-white dark:bg-gray-800 px-2 py-1 md:px-3 md:py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 text-[10px] md:text-xs font-semibold text-blue-500 whitespace-nowrap">
                {t('Food')} -$900
                </div>

            </div>
            </div>
        </section>

        {/* قسم مميزات التطبيق */}
        <section className="w-full bg-gray-50 dark:bg-transparent py-16 md:py-20 px-6 md:px-8 border-t border-gray-100 dark:border-gray-800/50">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('About Us')}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                {t('About_p')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* ... البطاقات الثلاث تبقى كما هي ... */}
                <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t('Secure Identification')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t('Secure Iden p')}
                </p>
                </div>

                <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <LineChart size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t('Smart Analytics')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t('Smart Ana p')}
                </p>
                </div>

                <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <RefreshCcw size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t('Seamless Sync')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t('Seamless Sync p')}
                </p>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
};

export default HomePage;