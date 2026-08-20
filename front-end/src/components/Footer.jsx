import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation();
    
    // استخراج السنة الحالية برمجياً لكي تتحدث تلقائياً
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-[#0B1120] border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 py-8 px-8 transition-colors duration-300 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* 1. الشعار والنص الوصفي */}
            <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
                <span className="font-bold text-lg tracking-wide">Clear Spend</span>
            </div>
            <p className="text-xs">
                {t('Footer subtitle')}
            </p>
            </div>

            {/* 2. الروابط المهمة */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('Privacy Policy')}
            </Link>
            <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('Terms of Service')}
            </Link>
            <Link to="/support" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('Contact Support')}
            </Link>
            </div>

            {/* 3. حقوق النشر */}
            <div className="text-xs">
            &copy; {currentYear} Clear Spend. {t('Rights Senctence')}
            </div>

        </div>
        </footer>
    );
};

export default Footer;