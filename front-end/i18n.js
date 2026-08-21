import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// القاموس
const resources = {
    en: {
        translation: {

            // Home page
            "Home": "Home",
            "Statistics": "Statistics",
            "Expenses": "Expenses",
            "Expenses_Hero": "Expenses",
            "Manager_Hero":  "Manager",
            "Hero_p": "Gain complete clarity over your financial lifestyle. Track, analyze, and optimize your spending with intuitive, professional-grade tools.",
            "Total Balance": "Total Balance",
            "Salary": "Salary",
            "Rent": "Rent",
            "Food": "Food",
            "Get Started": "Get Started",
            "Sign In": "Sign In",
            "About Us": "About Us",
            "About_p": "We designed Clear Spend to strip away the complexity of traditional accounting, providing a calm, focused environment for your financial data.",
            "Secure Identification": "Secure Identification",
            "Secure Iden p": "Your financial data is protected with enterprise-grade encryption. We prioritize your privacy above all else, ensuring your information remains exclusively yours.",
            "Smart Analytics": "Smart Analytics",
            "Smart Ana p": "Visualize your spending habits instantly. Our intuitive charts and categorized breakdowns help you identify trends and optimize your budget effortlessly.",
            "Seamless Sync": "Seamless Sync",
            "Seamless Sync p": "Access your finances anywhere. Your data synchronizes perfectly across all your devices, giving you total control whether you\'re at home or on the go.",
            "Footer subtitle": "Financial Clarity for Modern Lifestyles.",
            "Rights Senctence": "All rights reserved.",
            
            // Expenses Page
            "Category": "Category (e.g. Salary, Rent)",
        }
    },
    ar: {
        translation: {
            // Home page
            "Home": "الرئيسية",
            "Statistics": "الإحصائيات",
            "Expenses": "المصاريف",
            "Expenses_Hero": "مدير",
            "Manager_Hero":  "المصاريف",
            "Hero_p": "احصل على رؤية واضحة وشاملة لنمط حياتك المالي؛ وتتبّع نفقاتك وحلّلها وحسّنها باستخدام أدوات احترافية سهلة الاستخدام.",
            "Total Balance": "إجمالي الرصيد",
            "Get Started": "ابدأ الآن",
            "Sign In": "تسجيل الدخول",
            "About Us": "من نحن",
            "About_p": 'لقد صممنا كلير سبيند لإزالة تعقيدات المحاسبة التقليدية، موفرين بذلك بيئة هادئة ومركزة لبياناتك المالية.',
            "Secure Identification": "توثيق آمن",
            "Secure Iden p": "بياناتك المالية محمية بتقنيات تشفير بمستوى المؤسسات الكبرى. نحن نضع خصوصيتك على رأس أولوياتنا، ونضمن بقاء معلوماتك ملكاً لك وحدك.",
            "Smart Analytics": "إحصائيات ذكية",
            "Smart Ana p": "كوّن تصوراً فورياً لعادات إنفاقك؛ إذ تساعدك رسومنا البيانية سهلة الاستخدام وتصنيفات النفقات التفصيلية على رصد الاتجاهات وتحسين ميزانيتك بكل سهولة.",
            "Seamless Sync": "مزامنة سحابية",
            "Seamless Sync p": "تمكّن من إدارة شؤونك المالية من أي مكان؛ إذ تتم مزامنة بياناتك بسلاسة تامة عبر جميع أجهزتك، مما يمنحك تحكماً كاملاً سواء كنت في المنزل أو أثناء التنقل.",
            "Footer subtitle": "وضوح مالي لأنماط الحياة العصرية.",
            "Privacy Policy": "سياسة الخصوصية",
            "Terms of Service": "شروط الخدمة",
            "Contact Support": "الإتصال بالدعم",
            "Rights Senctence": "جميع الحقوق محفوظة.",
            "Language": "اللغة",
            "Account Settings": "إعدادات الحساب",
            "Sign Out": "تسجيل الخروج",

            // Auth Page
            "Welcome to": "أهلا بك في",
            "Financial clarity starts here.": "الوضوح المالي يبدأ من هنا.",
            "Login": "تسجيل الدخول",
            "Sign up": "إنشاء حساب",
            "Username or Email": "اسم المستخدم أو البريد الإلكتروني",
            "Password": "كلمة المرور",
            "Back Home": "العودة الى الرئيسية",
            "Name": "الإسم",
            "Username": "اسم المستخدم",
            "Email": "البريد الإلكتروني",
            "Sign Up": "إنشاء الحساب",
            "We sent you an activation on your email, please click it to active your account": "أرسلنا لك رابط تفعيل على إيميلك، الرجاء تفعيل حسابك بالدخول على الرابط",
            // Expenses Page
            "Salary": "الراتب",
            "Rent": "الإيجار",
            "Food": "الطعام",
            "Groceries": "سلع بقالة",
            "Utilities": "فواتير الخدمات",
            "Internet": "الإنترنت",
            "Transport": "المواصلات",
            "Freelance": "العمل الحر",
            "Commerce": "تجارة",
            "Outing": "الطلعات",
            "Amount": "المبلغ",
            "Category": "الفئة (الراتب، سلع البقالة، إلخ..)",
            "Search expenses...": "البحث عن مصروف...",
            "Recurring": "المصاريف المتكررة",
            "Expense": "مصروف",
            "Newest": "الأحدث",
            "Highest Amount": "المبلغ الأعلى",
            "Lowest Amount": "المبلغ الأقل",
            "Details": "التفاصيل",
            "Time": "التاريخ",
            "Select a category...": "اختر فئة...",
            "Other (Please specify)": "أخرى (الرجاء التحديد)",
            "Custom Category Name": "إسم فئة مخصصة",
            "Amount ($)": "المبلغ ($)",
            "Cancel": "إلغاء",
            "Add Expense": "إضافة مصروف",
            "Save Changes": "حفظ التعديلات",
            "Are you sure you want to delete this expense?": "هل أنت متأكد من حذف هذا المصروف؟",
            // Statistics Page
            "Overview of your financial activity": "نظرة عامة على نشاطك المالي",
            "All": "الكل",
            "Income": "المدخول",
            "Outcomes": "المصروف",
            "Recent": "مؤخرًا",
            "Categories": "الفئة",
            "Recent Transactions": "المعاملات الأخيرة"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
        escapeValue: false
        }
});

export default i18n;