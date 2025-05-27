import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/opening pages/Home';
import About from './pages/opening pages/About';
import Contact from './pages/opening pages/Contact';
import Dashboard from './pages/inner pages/Dashboard';
import Income from './pages/inner pages/Income';
import Expenses from './pages/inner pages/Expenses';
import Savings from './pages/inner pages/Savings'; 
import Goals from './pages/inner pages/Goals';
import Investment from './pages/inner pages/Investment'; 
import Insurance from './pages/inner pages/Insurance';
import Transactions from './pages/inner pages/Transaction';
import Settings from './pages/inner pages/Settings';
import Profile from './pages/inner pages/Profile';
import GoToTop from './components/GoToTop';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/income" element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              } />
              <Route path="/expenses" element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              } />
              <Route path="/savings" element={
                <ProtectedRoute>
                  <Savings />
                </ProtectedRoute>
              } />
              <Route path="/goals" element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              } />
              <Route path="/investment" element={ 
                <ProtectedRoute>
                  <Investment />
                </ProtectedRoute>
              } />
              <Route path="/insurance" element={ 
                <ProtectedRoute>
                  <Insurance />
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={ 
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
            <GoToTop />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;