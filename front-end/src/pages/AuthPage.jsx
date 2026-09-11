import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, AtSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import apiClient from '../api/client';

const AuthPage = () => {
    // حالة (State) لتحديد ما إذا كان المستخدم في شاشة الدخول أم إنشاء حساب
    const [isLogin, setIsLogin] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    })

    const { t, i18n } = useTranslation();

    const handleRegister = async (userData) => {

        try {
            const response = await apiClient.post('/users/signup', userData);

            alert(t("We sent you an activation on your email, please click it to active your account"));
        } catch (error) {
            alert(error.response?.data?.detail)
            console.error("Error: ", error.response?.data?.detail || error.message)
        }
    }

    const handleLogin = async (userData) => {
        try{
            const formData = new URLSearchParams();
            formData.append("username", userData.username);
            formData.append("password", userData.password);


            const response = await apiClient.post('/users/login', formData, {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            });

            const token = response.data.access_token;
            localStorage.setItem('token', token);


            alert(t("Login Successful!"));
            console.log("تم تسجيل الدخول، التوكن الخاص بك:", token);
        } catch (error) {
            
            alert(error.response?.data?.detail || "Login failed");
            console.error("Error: ", error.response?.data?.detail || error.message);
        }
    }
    return (
        // الخلفية المتدرجة كما في التصميم
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-[#0B1120] dark:to-[#050A15] p-4 transition-colors duration-300">
        
        <div className="w-full max-w-md">
            {/* النصوص الترحيبية */}
            <div className="text-center mb-8">
            <h2 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{t("Welcome to")}</h2>
            <h1 className="text-blue-600 dark:text-blue-500 font-bold text-2xl mb-1">Clear Spend</h1>
            <p className="text-gray-500 dark:text-gray-500 text-sm">{t("Financial clarity starts here.")}</p>
            </div>

            {/* بطاقة النموذج */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-blue-100/50 dark:shadow-none p-8 border border-gray-100 dark:border-gray-800">
            
            {/* زر التبديل بين Login و Sign up */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-8">
                <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
                    isLogin ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-500'
                }`}
                >
                {t("Login")}
                </button>
                <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
                    !isLogin ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-500'
                }`}
                >
                {t("Sign up")}
                </button>
            </div>

            {/* النموذج (Form) */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                
                {/* حقل الاسم (يظهر فقط في إنشاء الحساب) */}
                {!isLogin && (
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("Name")}</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Ahmed"
                        value={inputs.name}
                        onChange={(event) => setInputs({...inputs, name: event.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                    />
                    </div>
                </div>
                )}

                {/* حقل اسم المستخدم أو المعرف */}
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isLogin ? t('Username or Email') : t('Username')}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <AtSign size={18} />
                    </div>
                    <input
                    type="text"
                    placeholder={isLogin ? "mohammed@Test.com" : "Ahmed14"}
                    value={inputs.username}
                    onChange={(event) => setInputs({...inputs, username: event.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                    />
                </div>
                </div>

                {/* حقل الإيميل (يظهر فقط في إنشاء الحساب) */}
                {!isLogin && (
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("Email")}</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={18} />
                    </div>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={inputs.email}
                        onChange={(event) => setInputs({...inputs, email: event.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                    />
                    </div>
                </div>
                )}

                {/* حقل كلمة المرور */}
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("Password")}</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                    </div>
                    <input
                    type="password"
                    placeholder="••••••••"
                    value={inputs.password}
                        onChange={(event) => setInputs({...inputs, password: event.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                    />
                </div>
                </div>

                {/* زر الإرسال */}
                <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center cursor-pointer gap-2 transition-colors"
                onClick={() => {
                    if(isLogin){
                        handleLogin(inputs)
                    } else{
                        handleRegister(inputs)
                    }
                }}
                >
                {isLogin ? t('Login') : t('Sign Up')}
                <ArrowRight size={18} />
                </button>
            </form>
            </div>

            {/* زر العودة للرئيسية */}
            <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft size={16} />
                {t("Back Home")}
            </Link>
            </div>
            
        </div>
        </div>
    );
};

export default AuthPage;