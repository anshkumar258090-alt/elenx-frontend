import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import AuthSuccess from './pages/AuthSuccess';
import { AuthProvider } from './context/AuthContext';

function App() {
 useEffect(() => {
 // Disable default browser scroll restoration safely
 if (typeof window !== 'undefined' && window.history && 'scrollRestoration' in window.history) {
 window.history.scrollRestoration = 'manual';
 }
 // Force scroll to top
 window.scrollTo(0, 0);
 }, []);

 return (
 <ErrorBoundary>
  <AuthProvider>
   <Router>
    <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/auth-success" element={<AuthSuccess />} />
     <Route path="/dashboard" element={<Navigate to="/login" replace />} /> {/* Deprecated route, redirect */}
     <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
     <Route path="/admin/login" element={<AdminLogin />} />
     <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
    </Routes>
   </Router>
  </AuthProvider>
 </ErrorBoundary>
 );
}

export default App;
