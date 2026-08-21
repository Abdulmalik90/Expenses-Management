import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
    const { t, i18n } = useTranslation();
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // حالة قائمة الجوال

    const toggleLanguage = (lang) => {
        i18n.changeLanguage(lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        // أضفنا relative لكي تظهر قائمة الجوال أسفل الهيدر مباشرة
        <header className="relative flex justify-between items-center py-4 px-4 md:px-8 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 z-50">
        
        {/* 1. شعار التطبيق */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md shrink-0"></div>
            <span className="font-bold text-lg md:text-xl tracking-wide">Clear Spend</span>
        </div>

        {/* 2. روابط التنقل (مخفية في الجوال، تظهر في الشاشات المتوسطة فأكبر) */}
        <nav className="hidden md:flex gap-8 font-medium">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('Home')}</Link>
            <Link to="/statistics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('Statistics')}</Link>
            <Link to="/expenses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('Expenses')}</Link>
        </nav>

        {/* 3. أزرار التحكم */}
        <div className="flex items-center gap-3 md:gap-6">
            
            {/* تغيير اللغة */}
            <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 text-xs md:text-sm font-semibold transition-colors">
            <button 
                onClick={() => toggleLanguage('en')}
                className={`px-2 py-1 md:px-3 rounded-full ${i18n.language === 'en' ? 'bg-white text-black dark:bg-gray-600 dark:text-white shadow-sm' : 'text-gray-500'}`}
            >
                EN
            </button>
            <button 
                onClick={() => toggleLanguage('ar')}
                className={`px-2 py-1 md:px-3 rounded-full ${i18n.language === 'ar' ? 'bg-white text-black dark:bg-gray-600 dark:text-white shadow-sm' : 'text-gray-500'}`}
            >
                AR
            </button>
            </div>

            {/* تغيير المظهر */}
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* ملف المستخدم والقائمة المنسدلة */}
            <div className="relative">
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 md:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <img 
                src="https://i.pravatar.cc/150?img=47" 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                />
                <ChevronDown size={16} className="text-gray-600 dark:text-gray-300 hidden sm:block" />
            </button>

            {/* الحل السحري لمشكلة الـ RTL: ltr:right-0 rtl:left-0 */}
            {isProfileOpen && (
                <div className="absolute top-12 ltr:right-0 rtl:left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">{t("Account Settings")}</Link>
                <button className="w-full text-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">{t("Sign Out")}</button>
                </div>
            )}
            </div>

            {/* زر الهامبرغر للموبايل */}
            <button 
            className="md:hidden p-1 text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* قائمة الجوال المنسدلة */}
        {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#0B1120] border-b border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-4 md:hidden shadow-lg z-40">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-medium hover:text-blue-600">{t('Home')}</Link>
            <Link to="/statistics" onClick={() => setIsMobileMenuOpen(false)} className="font-medium hover:text-blue-600">{t('Statistics')}</Link>
            <Link to="/expenses" onClick={() => setIsMobileMenuOpen(false)} className="font-medium hover:text-blue-600">{t('Expenses')}</Link>
            
            {/* زر اللغة يظهر في القائمة في الجوال لأننا أخفيناه من الأعلى لتوفير المساحة */}
            <div className="flex items-center gap-4 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-gray-500">{t("Language")}:</span>
                <button onClick={() => { toggleLanguage('en'); setIsMobileMenuOpen(false); }} className={`text-sm font-bold ${i18n.language === 'en' ? 'text-blue-600' : 'text-gray-500'}`}>EN</button>
                <button onClick={() => { toggleLanguage('ar'); setIsMobileMenuOpen(false); }} className={`text-sm font-bold ${i18n.language === 'ar' ? 'text-blue-600' : 'text-gray-500'}`}>AR</button>
            </div>
            </div>
        )}
        </header>
    );
};

export default Header;