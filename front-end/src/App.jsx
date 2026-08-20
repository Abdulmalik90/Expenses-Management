import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage'; // سنقوم بإنشائه الآن
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';

// مكون يمثل التخطيط الأساسي (Layout) للصفحات التي تحتوي على هيدر وفووتر
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#050A15] transition-colors duration-300">
      <Header />
      {/* هنا سيتم عرض محتوى الصفحة الحالية */}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* مسار شاشة تسجيل الدخول (عادة لا نضع لها هيدر وفووتر، بل صفحة مستقلة) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* المسارات التي تحتوي على الهيدر والفووتر */}
        <Route element={<MainLayout />}>
          {/* سنقوم ببرمجة هذه الصفحات لاحقاً */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/statistics" element={<Statistics/>} />
          <Route path="/expenses" element={<Dashboard/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;