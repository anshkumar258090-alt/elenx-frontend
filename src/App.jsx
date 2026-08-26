import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import DeliveryPolicy from './pages/DeliveryPolicy';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
    <CartProvider>
     <Router>
      <ScrollToTop />
      <Routes>
       {/* Public Pages - No Auth Required */}
       <Route path="/" element={<LandingPage />} />
       <Route path="/about" element={<AboutPage />} />
       <Route path="/contact" element={<ContactPage />} />
       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
       <Route path="/terms" element={<TermsConditions />} />
       <Route path="/refund-policy" element={<RefundPolicy />} />
       <Route path="/delivery-policy" element={<DeliveryPolicy />} />
       <Route path="/cookie-policy" element={<CookiePolicy />} />

       {/* Auth Pages */}
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/auth-success" element={<AuthSuccess />} />
       <Route path="/dashboard" element={<Navigate to="/login" replace />} />

       {/* Protected Pages */}
       <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
       <Route path="/admin/login" element={<AdminLogin />} />
       <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

       {/* 404 Catch-all */}
       <Route path="*" element={<NotFound />} />
      </Routes>
     </Router>
    </CartProvider>
   </AuthProvider>
 </ErrorBoundary>
 );
}

export default App;
