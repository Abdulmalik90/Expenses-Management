import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage'; // سنقوم بإنشائه الآن
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import ProtectedRoute from './pages/ProjtectedRoute';

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
      <div className="min-h-screen bg-gray-50 dark:bg-[#050A15] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
        <Header />
        
        <Routes>
          {/* مسارات عامة (متاحة للجميع) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* مسارات محمية (تتطلب تسجيل دخول) */}
          <Route 
            path="/expenses" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/statistics" 
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;