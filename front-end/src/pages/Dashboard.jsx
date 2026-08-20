import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Search, Plus, Filter, ChevronDown, 
    Edit2, Trash2, X, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

// بيانات وهمية (Mock Data) للتجربة قبل ربطها بالباك إند
const initialExpenses = [
    { id: 1, type: 'income', title: 'Salary', amount: 2000, details: 'Monthly base salary deposit', date: 'Oct 25, 2026 - 09:00 AM' },
    { id: 2, type: 'expense', title: 'Groceries', amount: 150, details: 'Weekly supermarket run at Whole Foods', date: 'Oct 24, 2026 - 06:30 PM' },
    { id: 3, type: 'expense', title: 'Utilities', amount: 220, details: 'Electric and Water bill for October', date: 'Oct 20, 2026 - 10:15 AM' },
];

const initialRecurring = [
{ id: 4, type: 'expense', title: 'Internet', amount: 60, details: 'Monthly fiber connection', date: 'Every 1st of the month' },
];



const Dashboard = () => {
    const { t } = useTranslation();

    

    // قائمة التصنيفات الافتراضية
    const DEFAULT_CATEGORIES = ['Salary', 'Groceries', 'Utilities', 'Internet', 'Food', 'Rent', 'Transport', 'Freelance', 'Commerce'];

    // حالات جديدة لإدارة حقل التصنيف
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    
    // 1. إدارة الحالات (States)
    const [activeTab, setActiveTab] = useState('expenses'); // 'expenses' | 'recurring'
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    
    // حالات النافذة المنبثقة (Modal)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [currentExpense, setCurrentExpense] = useState(null);

    // جلب البيانات بناءً على التبويب النشط
    const currentData = activeTab === 'expenses' ? initialExpenses : initialRecurring;

    // --- المنطق الهندسي للبحث والترتيب ---
    const processedData = currentData
        // 1. تطبيق البحث (Search) مع دعم تعدد اللغات
        .filter((item) => {
            // نقوم بترجمة العنوان والتفاصيل في الخلفية باستخدام دالة t
            const translatedTitle = t(item.title).toLowerCase();
            // إذا كنت تترجم التفاصيل أيضاً، نستخدم t، وإلا نستخدمها كما هي
            const translatedDetails = t(item.details).toLowerCase(); 
            const query = searchQuery.toLowerCase();

        // الآن نقارن النص المكتوب مع النص المترجم الفعلي
        return (
            translatedTitle.includes(query) || 
            translatedDetails.includes(query)
        );
        })
        // 2. تطبيق الترتيب (Sort)
        .sort((a, b) => {
            if (sortOption === 'highest') return b.amount - a.amount;
            if (sortOption === 'lowest') return a.amount - b.amount;
            return b.id - a.id; 
        });

    // 2. دوال التحكم (Handlers)
    const handleOpenModal = (mode, expense = null) => {
    setModalMode(mode);
    setCurrentExpense(expense);
    
    // منطق تعبئة الحقل عند التعديل
    if (mode === 'edit' && expense) {
        if (DEFAULT_CATEGORIES.includes(expense.title)) {
            setSelectedCategory(expense.title);
            setCustomCategory('');
        } else {
            // إذا كان التصنيف غير موجود في القائمة الافتراضية، نعتبره "أخرى"
            setSelectedCategory('other');
            setCustomCategory(expense.title);
        }
        } else {
            // تصفير الحقول عند إضافة مصروف جديد
            setSelectedCategory('');
            setCustomCategory('');
        }
        
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentExpense(null);
        setSelectedCategory('');
        setCustomCategory('');
    };

    const handleDelete = (id) => {
        // التنبيه قبل الحذف كما طلبت
        const confirmDelete = window.confirm(t('Are you sure you want to delete this expense?'));
        if (confirmDelete) {
        console.log('Deleted expense with ID:', id);
        // لاحقاً هنا سنضع دالة fetch مع ميثود DELETE
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full animate-fade-in">
        
        {/* --- شريط الأدوات العلوي (Toolbar) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            
            {/* حقل البحث */}
            <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-3 rtl:pr-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
            </div>
            <input
                type="text"
                placeholder={t('Search expenses...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
            />
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* التبويبات */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                onClick={() => setActiveTab('expenses')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'expenses' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                {t('Expenses')}
                </button>
                <button
                onClick={() => setActiveTab('recurring')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'recurring' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                {t('Recurring')}
                </button>
            </div>

            {/* زر إضافة مصروف */}
            <button 
                onClick={() => handleOpenModal('add')}
                className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                <Plus size={16} />
                {t('Expense')}
            </button>

            {/* زر الفلترة / الترتيب */}
            <div className="relative hidden sm:flex items-center">
                <div className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center pointer-events-none text-gray-400">
                    <Filter size={16} />
                </div>
                <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ltr:pl-9 rtl:pr-9 ltr:pr-8 rtl:pl-8 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors outline-none cursor-pointer"
                >
                    <option value="newest">{t('Newest')}</option>
                    <option value="highest">{t('Highest Amount')}</option>
                    <option value="lowest">{t('Lowest Amount')}</option>
                </select>
                <div className="absolute inset-y-0 ltr:right-3 rtl:left-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={14} />
                </div>
            </div>
            </div>
        </div>

        {/* --- شبكة المصاريف (Grid) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {processedData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                
                {/* العنوان والأيقونة */}
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {item.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t(item.title)}</h3>
                </div>

                {/* المبلغ */}
                <span className={`text-2xl font-bold ${item.type === 'income' ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                    {item.type === 'income' ? '+' : '-'}${item.amount}
                </span>
                </div>

                <hr className="border-gray-100 dark:border-gray-800 my-4" />

                <div className="flex justify-between items-end">
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    {t('Details')}: {item.details}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                    {t('Time')}: {item.date}
                    </p>
                </div>

                {/* أزرار التعديل والحذف (تظهر بوضوح عند تمرير الماوس) */}
                <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                    onClick={() => handleOpenModal('edit', item)}
                    className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
                    title={t('Edit')}
                    >
                    <Edit2 size={16} />
                    </button>
                    <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                    title={t('Delete')}
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* --- النافذة المنبثقة للإضافة والتعديل (Modal) --- */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                
                {/* عنوان المودال */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {modalMode === 'add' ? t('Add New Expense') : t('Edit Expense')}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <X size={20} />
                </button>
                </div>

                {/* نموذج الإدخال (Form) */}
                <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                
                {/* حقل القائمة المنسدلة للتصنيفات */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('Category')}</label>
                    <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white appearance-none cursor-pointer"
                    required
                    >
                    <option value="" disabled>{t('Select a category...')}</option>
                    {DEFAULT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{t(cat)}</option>
                    ))}
                    <option value="other">{t('Other (Please specify)')}</option>
                    </select>
                </div>

                {/* حقل التصنيف المخصص (يظهر فقط إذا اختار المستخدم "أخرى") */}
                {selectedCategory === 'other' && (
                    <div className="space-y-1 animate-fade-in">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('Custom Category Name')}</label>
                    <input 
                        type="text" 
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        placeholder={t('e.g., Car Maintenance')}
                        required
                    />
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('Amount ($)')}</label>
                    <input 
                    type="number" 
                    defaultValue={currentExpense?.amount || ''}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    placeholder="0.00"
                    required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('Details')}</label>
                    <textarea 
                    defaultValue={currentExpense?.details || ''}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white resize-none"
                    rows="3"
                    placeholder={t('Brief description...')}
                    ></textarea>
                </div>

                {/* أزرار الحفظ والإلغاء */}
                <div className="flex justify-end gap-3 mt-8">
                    <button 
                    type="button" 
                    onClick={closeModal}
                    className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                    {t('Cancel')}
                    </button>
                    <button 
                    type="submit"
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                    {modalMode === 'add' ? t('Add Expense') : t('Save Changes')}
                    </button>
                </div>
                </form>
                
            </div>
            </div>
        )}

        </div>
    );
};

export default Dashboard;