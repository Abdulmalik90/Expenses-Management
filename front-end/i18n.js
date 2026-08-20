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
            // سنضيف المزيد لاحقاً
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
            // Expenses Page
            "Salary": "الراتب",
            "Rent": "الإيجار",
            "Food": "الطعام",
            "Groceries": "سلع بقالة",
            "Utilities": "الطلعات",
            "Internet": "الإنترنت",
            "Transport": "المواصلات",
            "Freelance": "العمل الحر",
            "Commerce": "تجارة"
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