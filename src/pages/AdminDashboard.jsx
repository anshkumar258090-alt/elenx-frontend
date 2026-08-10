import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  Users,
  Settings,
  LogOut,
  Search,
  Bell,
  CheckCircle,
  Activity,
  Trash2,
  Shield,
  Server,
  Settings2,
  X,
  CreditCard,
  UploadCloud,
  Zap,
  Menu,
  MessageSquare,
  Mail,
  Eye,
  Clock
} from 'lucide-react';
import AdminUploads from '../components/AdminUploads';
import ParticleBackground from '../components/ParticleBackground';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logoutAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [stats, setStats] = useState({
    webUsers: 0,
    totalClients: 0,
    activeSubs: 0,
    systemStatus: 'Online'
  });

  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [editAccess, setEditAccess] = useState({ internal: false, external: false, bypass: false, streamer: false });
  const [togglingType, setTogglingType] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Contact Messages State
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [expandedMessage, setExpandedMessage] = useState(null);

  // Settings State
  const [settingsUpiId, setSettingsUpiId] = useState('');
  const [settingsQrImage, setSettingsQrImage] = useState(null);
  const [currentQrUrl, setCurrentQrUrl] = useState('');
  const [loadingPaymentSettings, setLoadingPaymentSettings] = useState(false);
  const [savingPaymentSettings, setSavingPaymentSettings] = useState(false);

  // Logout Handler
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logoutAdmin();
      navigate('/admin/login', { replace: true });
    }
  };

  // Fetch Users (for User Manager & Overview)
  const fetchUsers = async () => {
    console.log("[AdminDashboard] Fetching users & refreshing list...");
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        // Stats logic (Client count must be addressed separately if needed, 
        // as data now only contains top-level users)
        setStats(prev => ({
          ...prev,
          webUsers: data.length, // All users returned are top-level web users
          totalClients: 0,       // Need a new route to fetch all client data globally if desired
          activeSubs: data.filter(u => u.license_status === 'ACTIVE').length
        }));
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Delete User Handler
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Remove from local state
        setUsers(prev => prev.filter(user => user._id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Open Manage Modal
  const handleManageUser = async (userId) => {
    setSelectedUser(userId);
    setShowManageModal(true);
    setLoadingDetails(true);
    try {
      let token = localStorage.getItem('admin_token');
      if (!token) throw new Error("No token found. Please login again.");

      // Ensure "Bearer " prefix exists for standard backend compatibility
      if (!token.startsWith('Bearer ')) {
        token = `Bearer ${token}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/user-details/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load user data");
      }

      setUserDetails(data);
      setEditAccess(data.webUser?.accessRights || { internal: false, external: false, bypass: false, streamer: false });
    } catch (error) {
      console.error("Fetch Error:", error);
      alert(error.message); // Show actual issue instead of generic error
      setShowManageModal(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Show animated temporary Toast notifications
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Instant Save Access Rights on Toggling Toggles
  const handleToggleAccess = async (type) => {
    const updatedAccess = {
      ...editAccess,
      [type]: !editAccess[type]
    };
    
    console.log("[AdminDashboard] admin toggle updates: Toggling product type", type, "to", !editAccess[type]);
    console.log(`[AdminDashboard] User ID: ${selectedUser}`);

    setTogglingType(type);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/user-access/${selectedUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ accessRights: updatedAccess })
      });

      const data = await response.json();
      console.log("[AdminDashboard] Database update response received:", { status: response.status, data });

      if (response.ok) {
        setEditAccess(updatedAccess);
        showToast("Access Updated Successfully", "success");
        fetchUsers(); // Refresh main list to keep table in sync
      } else {
        throw new Error(data.message || "Failed to update access rights");
      }
    } catch (error) {
      console.error("[AdminDashboard] Database update failure:", error);
      showToast(error.message || "Access Update Failed", "error");
    } finally {
      setTogglingType(null);
    }
  };

  // Fetch Payment Settings
  const fetchPaymentSettings = async () => {
    setLoadingPaymentSettings(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings/payment`);
      const data = await response.json();
      if (response.ok) {
        setSettingsUpiId(data.upiId || '');
        setCurrentQrUrl(data.qrCodeUrl || '');
      }
    } catch (error) {
      console.error("Failed to fetch payment settings", error);
    } finally {
      setLoadingPaymentSettings(false);
    }
  };

  // Save Settings Handler
  const handleSavePaymentSettings = async (e) => {
    e.preventDefault();
    setSavingPaymentSettings(true);
    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('upiId', settingsUpiId);
      if (settingsQrImage) {
        formData.append('qrCode', settingsQrImage);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings/payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert("Payment settings updated successfully");
        setSettingsQrImage(null); // Clear selected file
        fetchPaymentSettings();   // Refresh view
      } else {
        const errorData = await response.json();
        alert(`Failed to update settings: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("An error occurred. Please check console.");
    } finally {
      // ENSURE the loading state is unconditionally reset here
      setSavingPaymentSettings(false);
    }
  };

  // Fetch Contact Messages
  const fetchContactMessages = async () => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setContactMessages(data);
        setUnreadCount(data.filter(m => !m.isRead).length);
      }
    } catch (error) {
      console.error('Failed to fetch contact messages', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchContactMessages();
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchContactMessages();
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  // Fetch data on mount
  useEffect(() => {
    console.log("[AdminDashboard] Dashboard mounted");
    fetchUsers();
    fetchContactMessages();
  }, []);

  // Refresh data when switching to relevant tabs
  useEffect(() => {
    if (activeTab === 'users' || activeTab === 'overview') {
      fetchUsers();
    }
    if (activeTab === 'settings') {
      fetchPaymentSettings();
    }
    if (activeTab === 'messages') {
      fetchContactMessages();
    }
  }, [activeTab]);

  // Sidebar Navigation Item Component
  const NavItem = ({ id, icon: Icon, label, badge }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${activeTab === id
          ? 'bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/20 text-[#AEB6C2] border border-[#AEB6C2]/20 shadow-[0_0_15px_rgba(174, 182, 194,0.2)]'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
      <Icon size={20} className={`transition-colors ${activeTab === id ? 'text-[#AEB6C2]' : 'text-gray-500 group-hover:text-white'}`} />
      <span className="font-medium">{label}</span>
      {badge > 0 && (
        <span className="ml-auto min-w-[20px] h-5 flex items-center justify-center px-1.5 text-[10px] font-bold rounded-full bg-[#D9DEE5] text-zinc-950">{badge}</span>
      )}
      {activeTab === id && !badge && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AEB6C2] shadow-[0_0_8px_currentColor]" />
      )}
    </button>
  );

  // Stats Card Component
  const StatsCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg bg-black/30 ${color}`}>
          <Icon size={24} />
        </div>
        {/* <span className="text-xs text-gray-500 bg-black/20 px-2 py-1 rounded">+2.5%</span> */}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-400 font-medium">{title}</p>
      {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white font-inter overflow-hidden relative">
      {/* Ambient Dashboard Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 z-40 bg-[#050608]/80 backdrop-blur-sm lg:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-72 bg-[#0f0f13]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 fixed top-0 h-screen transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 left-0' : '-translate-x-full lg:left-0'
        }`}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AEB6C2] to-[#AEB6C2] flex items-center justify-center shadow-lg shadow-[#AEB6C2]/20">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">Elenx</h1>
              <p className="text-xs text-[#AEB6C2] font-medium tracking-wider">ADMIN OS v2.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Main Menu</p>
          <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
          <NavItem id="builds" icon={Rocket} label="Build Manager" />
          <NavItem id="users" icon={Users} label="User Manager" />
          <NavItem id="messages" icon={MessageSquare} label="Messages" badge={unreadCount} />

          <div className="my-6 border-t border-white/5"></div>

          <p className="px-4 text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">System</p>
          <NavItem id="settings" icon={Settings2} label="Settings" />
        </div>

        {/* Updates/User Profile */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all group"
          >
            <LogOut size={18} className="text-gray-500 group-hover:text-red-400" />
            <span className="font-medium text-gray-400 group-hover:text-red-400">Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden lg:ml-72 ml-0 pt-20 lg:pt-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 bg-[#0a0a0c]/50 backdrop-blur-md fixed lg:absolute top-0 right-0 left-0 lg:left-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#1e293b] border border-white/5 text-zinc-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {activeTab === 'overview' && 'System Overview'}
              {activeTab === 'builds' && 'Build Distribution'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'messages' && 'Contact Messages'}
              {activeTab === 'settings' && 'System Settings'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D9DEE5] rounded-full"></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D9DEE5] to-[#D9DEE5] border-2 border-white/10 shadow-lg"></div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

          {/* --- TAB: OVERVIEW --- */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  title="Web Users"
                  value={stats.webUsers}
                  icon={Users}
                  color="text-[#AEB6C2]"
                  subtext="Registered admins & resellers"
                />
                <StatsCard
                  title="System Status"
                  value={stats.systemStatus}
                  icon={Activity}
                  color="text-[#AEB6C2]"
                  subtext="All systems operational"
                />
                <StatsCard
                  title="Active Clients"
                  value={stats.totalClients}
                  icon={Users}
                  color="text-[#AEB6C2]"
                  subtext="Registered clients"
                />
              </div>

              {/* Recent Activity Placeholder */}
              <div className="glass-panel border border-white/10 rounded-2xl bg-[#0f0f13]/50 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Server size={18} className="text-gray-400" />
                  Server Health
                </h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-black/20">
                  <p className="text-gray-500">Real-time metrics visualization would go here</p>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB: BUILD MANAGER --- */}
          {activeTab === 'builds' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6">
                <p className="text-gray-400">Manage and distribute client executables securely. Files uploaded here are immediately available for download.</p>
              </div>
              <AdminUploads />
            </div>
          )}

          {/* --- TAB: USER MANAGER --- */}
          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="flex justify-between items-center bg-[#0f0f13]/50 p-4 rounded-xl border border-white/10">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#AEB6C2]/30 transition-colors text-sm"
                  />
                </div>
                <button onClick={fetchUsers} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/5">
                  Refresh List
                </button>
              </div>

              <div className="glass-panel border border-white/10 rounded-2xl bg-[#0f0f13]/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Username</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Access Type</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loadingUsers ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-500">Loading users...</td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-500">No users found.</td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4 text-xs font-mono text-gray-500 truncate max-w-[100px]">{user._id}</td>
                            <td className="p-4 font-medium text-white">{user.username}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase
                                                                ${user.role === 'admin' ? 'bg-[#D9DEE5]/20 text-[#F5F7FA] border border-[#AEB6C2]/20' :
                                  user.role === 'user' ? 'bg-[#D9DEE5]/20 text-[#F5F7FA] border border-[#AEB6C2]/20' :
                                    'bg-gray-700/50 text-gray-400 border border-gray-600/30'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-gray-400 capitalize">{user.accessType || '-'}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${user.license_status === 'ACTIVE' ? 'bg-[#D9DEE5] shadow-[0_0_8px_rgba(174, 182, 194,0.5)]' : 'bg-red-500'}`} />
                                <span className="text-sm">{user.license_status || 'Pending'}</span>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleManageUser(user._id)}
                                  className="p-2 text-gray-500 hover:text-[#AEB6C2] hover:bg-[#F5F7FA]/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                  title="Manage User"
                                >
                                  <Settings2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                  title="Delete User"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB: SETTINGS --- */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 max-w-4xl">

              <div className="glass-panel border border-white/10 rounded-3xl bg-[#0f0f13]/80 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-[#D9DEE5]/10 rounded-xl">
                    <CreditCard className="text-[#AEB6C2]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Global Payment Configuration</h3>
                    <p className="text-sm text-gray-400">Manage the official UPI payment details presented to users during top-up.</p>
                  </div>
                </div>

                <form onSubmit={handleSavePaymentSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Col: UPI ID Input */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Official UPI ID</label>
                        <input
                          type="text"
                          value={settingsUpiId}
                          onChange={(e) => setSettingsUpiId(e.target.value)}
                          placeholder="e.g. yourname@ybl"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AEB6C2]/30 transition-colors placeholder:text-gray-600 font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Upload New QR Code</label>
                        <div className="relative border-2 border-dashed border-white/10 rounded-xl bg-black/20 hover:bg-white/5 transition-colors group cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSettingsQrImage(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="p-6 flex flex-col items-center justify-center text-center">
                            <UploadCloud className="text-gray-500 group-hover:text-[#AEB6C2] transition-colors mb-2" size={24} />
                            <p className="text-sm text-gray-300 font-medium">Click to browse or drag & drop</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                            {settingsQrImage && (
                              <p className="mt-3 text-sm text-[#AEB6C2] font-bold bg-[#D9DEE5]/10 px-3 py-1 rounded-lg">Selected: {settingsQrImage.name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Col: Current QR Preview */}
                    <div className="bg-black/30 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 z-10">Current Live QR Code</h4>

                      {loadingPaymentSettings ? (
                        <div className="w-40 h-40 flex items-center justify-center animate-pulse bg-white/5 rounded-xl z-10">
                          <span className="text-gray-500 text-sm">Loading...</span>
                        </div>
                      ) : currentQrUrl ? (
                        <div className="relative group z-10">
                          <div className="absolute inset-0 bg-[#D9DEE5]/20 blur-xl rounded-full" />
                          <img
                            src={`${import.meta.env.VITE_API_URL}${currentQrUrl}`}
                            alt="Current QR Code"
                            className="w-48 h-48 object-contain rounded-xl shadow-2xl border border-white/10 relative z-10 bg-white"
                          />
                        </div>
                      ) : (
                        <div className="w-40 h-40 flex items-center justify-center bg-white/5 rounded-xl border border-dashed border-white/10 z-10">
                          <span className="text-gray-600 text-sm italic">No QR Uploaded</span>
                        </div>
                      )}

                      {/* Decorative bg elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9DEE5]/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D9DEE5]/10 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2" />
                    </div>

                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingPaymentSettings}
                      className="px-8 py-3 bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] hover:bg-[#F5F7FA] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {savingPaymentSettings ? 'Saving Configuration...' : 'Save Payment Configuration'}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* --- TAB: MESSAGES --- */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Messages received from the contact form on your website.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-500 bg-[#1e293b] border border-white/5 px-3 py-1.5 rounded-full uppercase">
                    {unreadCount} Unread
                  </span>
                  <button
                    onClick={fetchContactMessages}
                    className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {loadingMessages ? (
                <div className="py-20 text-center text-gray-500">Loading messages...</div>
              ) : contactMessages.length === 0 ? (
                <div className="py-20 text-center glass-panel rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8">
                  <div className="p-4 bg-[#1e293b]/60 rounded-full border border-white/5 text-zinc-500 mb-4">
                    <Mail size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">No Messages Yet</h4>
                  <p className="text-zinc-500 text-sm">When someone submits the contact form, their messages will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                        !msg.isRead
                          ? 'border-[#AEB6C2]/20 bg-[#D9DEE5]/[0.03] shadow-[0_0_15px_rgba(174,182,194,0.05)]'
                          : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      {/* Message Header */}
                      <div
                        className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedMessage(expandedMessage === msg._id ? null : msg._id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                              !msg.isRead
                                ? 'bg-[#D9DEE5]/20 text-[#AEB6C2] border border-[#AEB6C2]/20'
                                : 'bg-white/5 text-zinc-500 border border-white/10'
                            }`}>
                              {msg.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white text-sm">{msg.name}</span>
                                {!msg.isRead && (
                                  <span className="w-2 h-2 rounded-full bg-[#AEB6C2] animate-pulse flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-zinc-500 truncate">{msg.email}{msg.phone ? ` • ${msg.phone}` : ''}</p>
                              <p className={`text-sm mt-1 truncate ${!msg.isRead ? 'text-zinc-300 font-semibold' : 'text-zinc-500'}`}>
                                {msg.subject}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className="text-[10px] text-zinc-600 font-medium flex items-center gap-1">
                              <Clock size={10} />
                              {timeAgo(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Message Body */}
                      {expandedMessage === msg._id && (
                        <div className="px-5 pb-5 border-t border-white/5">
                          <div className="pt-4 pb-4">
                            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                            {!msg.isRead && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleMarkAsRead(msg._id); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D9DEE5]/10 border border-[#AEB6C2]/15 text-[#AEB6C2] rounded-lg text-xs font-bold hover:bg-[#F5F7FA]/20 transition-all"
                              >
                                <Eye size={12} /> Mark Read
                              </button>
                            )}
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-400 rounded-lg text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
                            >
                              <Mail size={12} /> Reply
                            </a>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteMessage(msg._id); }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-all ml-auto"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* User Manage Modal */}
        {showManageModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-2xl bg-[#0f0f13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h3 className="text-xl font-bold">Manage User Access</h3>
                  <p className="text-sm text-gray-400">UID: {selectedUser}</p>
                </div>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {loadingDetails ? (
                <div className="p-12 text-center text-gray-500">Loading user details...</div>
              ) : userDetails ? (
                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                  {/* Section 1: 🌐 Website Login Data */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Shield size={16} className="text-[#AEB6C2]" />
                      Section 1: 🌐 Website Login Data
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#1e293b]/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Email</p>
                        <p className="font-medium text-zinc-200">{userDetails?.webUser?.email || 'N/A'}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1e293b]/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Username</p>
                        <p className="font-medium text-zinc-200">{userDetails?.webUser?.username || 'N/A'}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1e293b]/50 border border-zinc-700/50 md:col-span-2">
                        <p className="text-xs text-zinc-500 mb-1">Password</p>
                        <p className="font-mono text-xs text-[#AEB6C2]/80 break-all">{userDetails?.webUser?.password || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-zinc-700 my-6" />

                  {/* Section 2: 🎮 Panel / Product Credentials */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Server size={16} className="text-[#AEB6C2]" />
                      Section 2: 🎮 Panel / Product Credentials
                    </h4>
                    <div className="border border-zinc-700/50 rounded-xl bg-[#1e293b]/30 overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-800 text-zinc-400 uppercase text-[10px] font-black tracking-widest">
                          <tr>
                            <th className="p-3">Product Type</th>
                            <th className="p-3">Client Username</th>
                            <th className="p-3">Client Password</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-700/30">
                          {(userDetails?.panelClients || []).length > 0 ? (userDetails?.panelClients || []).map(client => (
                            <tr key={client._id} className="hover:bg-white/5 transition-colors">
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border
                                  ${client.accessType === 'internal' ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border-[#AEB6C2]/15' :
                                    client.accessType === 'external' ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border-[#AEB6C2]/15' :
                                      'bg-[#D9DEE5]/10 text-[#AEB6C2] border-[#AEB6C2]/15'}`}>
                                  {client.accessType}
                                </span>
                              </td>
                              <td className="p-3 font-bold text-zinc-300">{client.username}</td>
                              <td className="p-3 font-mono text-xs text-zinc-400">{client.password}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${client.license_status === 'ACTIVE' || client.status === 'active' ? 'bg-[#D9DEE5] shadow-[0_0_8px_rgba(174, 182, 194,0.5)]' : 'bg-red-500'}`} />
                                  <span className="text-[10px] font-bold text-zinc-400">{client.license_status || client.status || 'Pending'}</span>
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="4" className="p-8 text-center text-zinc-500 italic text-xs">No product credentials generated by this user yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <hr className="border-zinc-700 my-6" />

                  {/* Section 3: Access Control Toggles */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Settings2 size={16} className="text-[#AEB6C2]" />
                      Section 3: 🎛️ Access Control (Enable/Disable)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {['internal', 'external', 'bypass', 'streamer'].map(type => {
                        const isToggling = togglingType === type;
                        const isChecked = editAccess?.[type] === true;
                        return (
                          <div key={type} className="flex items-center justify-between p-4 rounded-xl bg-[#1e293b]/50 border border-zinc-700/50">
                            <span className="capitalize font-medium text-zinc-300">{type}</span>
                            <button
                              disabled={togglingType !== null}
                              onClick={() => handleToggleAccess(type)}
                              className={`w-12 h-6 rounded-full transition-all relative flex items-center ${
                                isChecked 
                                  ? 'bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] shadow-[0_0_10px_rgba(174, 182, 194,0.4)]' 
                                  : 'bg-zinc-700'
                              } ${togglingType !== null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {isToggling ? (
                                <div className="mx-auto w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                              ) : (
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isChecked ? 'left-7' : 'left-1'}`} />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="border-zinc-700 my-6" />

                  {/* Section 4: Payment Screenshots */}
                  <div className="space-y-4 pb-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" />
                      Section 4: 💳 Payment Screenshots
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(userDetails?.webUser?.paymentProofs || []).length > 0 ? (
                        (userDetails?.webUser?.paymentProofs || []).map((proof, idx) => (
                          <div key={idx} className="bg-[#1e293b]/50 border border-zinc-700/50 rounded-xl overflow-hidden relative group">
                            <img src={`${import.meta.env.VITE_API_URL}${proof.imageUrl}`} alt="Payment Proof" className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity" />
                            <div className="absolute top-2 right-2">
                              <span className={`px-2 py-1 text-[10px] font-black uppercase rounded shadow-lg border backdrop-blur-md
                                ${proof.productType === 'internal' ? 'bg-[#D9DEE5]/80 text-white border-[#AEB6C2]/30' :
                                  proof.productType === 'external' ? 'bg-[#D9DEE5]/80 text-white border-[#AEB6C2]/30' :
                                    proof.productType === 'streamer' ? 'bg-[#D9DEE5]/80 text-white border-[#AEB6C2]/30' :
                                      'bg-[#D9DEE5]/80 text-white border-[#AEB6C2]/30'}`}>
                                {proof.productType}
                              </span>
                            </div>
                            <div className="p-3 bg-black/40 backdrop-blur-md absolute bottom-0 w-full">
                              <p className="text-xs text-zinc-300 font-medium flex justify-between">
                                <span>Uploaded:</span>
                                <span>{new Date(proof.uploadedAt).toLocaleString()}</span>
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-8 text-center bg-[#1e293b]/30 border border-zinc-700/50 rounded-xl border-dashed">
                          <p className="text-xs text-zinc-500 italic">No payment screenshots uploaded by this user.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end border-t border-zinc-700 mt-4">
                    <button
                      onClick={() => setShowManageModal(false)}
                      className="px-6 py-2 rounded-xl bg-zinc-800 text-sm font-bold hover:bg-zinc-750 text-zinc-300 transition-all shadow-lg"
                    >
                      Done / Close
                    </button>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center text-red-400">Failed to load user data</div>
              )}

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/5 bg-white/5 flex gap-3 justify-end">
                <button
                  onClick={() => setShowManageModal(false)}
                  className="px-6 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-zinc-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Instant Success / Error Toasts Container */}
      <div className="fixed top-5 right-5 z-[200] space-y-2 pointer-events-none">
        {toast.show && (
          <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto
            ${toast.type === 'success' 
              ? 'bg-[#D9DEE5]/10 border-[#AEB6C2]/20 text-[#AEB6C2] shadow-[0_0_20px_rgba(174, 182, 194,0.15)]' 
              : 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'}`}
          >
            <div className={`rounded-full p-1 bg-black/20`}>
              <Shield size={16} />
            </div>
            <span className="font-semibold text-sm tracking-wide">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
