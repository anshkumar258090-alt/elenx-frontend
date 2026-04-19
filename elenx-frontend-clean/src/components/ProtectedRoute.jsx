import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('client_token');
  const role = localStorage.getItem('role');

  if (!token || (role !== 'user' && role !== 'client')) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
