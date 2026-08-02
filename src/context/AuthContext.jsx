import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('admin_token'));
  const [clientToken, setClientToken] = useState(() => localStorage.getItem('client_token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync state with local storage on initialization
    const aToken = localStorage.getItem('admin_token');
    const cToken = localStorage.getItem('client_token');
    const currentRole = localStorage.getItem('role');

    setAdminToken(aToken);
    setClientToken(cToken);
    setRole(currentRole);
    setLoading(false);
    console.log("[AuthContext] Session synced on load:", { hasAdminToken: !!aToken, hasClientToken: !!cToken, role: currentRole });
  }, []);

  const loginAdmin = (token) => {
    console.log("[AuthContext] Storing admin credentials...");
    localStorage.setItem('admin_token', token);
    localStorage.setItem('role', 'admin');
    setAdminToken(token);
    setRole('admin');
    console.log("[AuthContext] Admin credentials saved successfully.");
  };

  const loginClient = (token, userRole) => {
    console.log("[AuthContext] Storing client credentials...");
    localStorage.setItem('client_token', token);
    localStorage.setItem('role', userRole || 'user');
    setClientToken(token);
    setRole(userRole || 'user');
    console.log("[AuthContext] Client credentials saved successfully.");
  };

  const logoutAdmin = () => {
    console.log("[AuthContext] Logging out admin...");
    localStorage.removeItem('admin_token');
    localStorage.removeItem('role');
    setAdminToken(null);
    setRole(null);
    console.log("[AuthContext] Admin session cleared.");
  };

  const logoutClient = () => {
    console.log("[AuthContext] Logging out client...");
    localStorage.removeItem('client_token');
    localStorage.removeItem('role');
    setClientToken(null);
    setRole(null);
    console.log("[AuthContext] Client session cleared.");
  };

  return (
    <AuthContext.Provider value={{
      adminToken,
      clientToken,
      role,
      loading,
      loginAdmin,
      loginClient,
      logoutAdmin,
      logoutClient
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
