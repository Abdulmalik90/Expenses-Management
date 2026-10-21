import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // 1. فحص وجود بطاقة المرور (Token) في ذاكرة المتصفح
    const token = localStorage.getItem('token');

    // 2. إذا لم يجد التوكن (المستخدم سجل خروجه أو لم يسجل أصلاً)
    if (!token) {
        // يتم توجيهه إجبارياً إلى صفحة المصادقة مع استبدال مسار التاريخ (replace)
        return <Navigate to="/auth" replace />;
    }

    // 3. إذا كان التوكن موجوداً، اسمح بعرض الصفحة المطلوبة (children)
    return children;
};

export default ProtectedRoute;